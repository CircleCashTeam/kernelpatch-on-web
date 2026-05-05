import type { KpmInfo } from '../types/kernel'

// kptools.js 初始化完成后返回的 Module 接口
export interface KpToolsModule {
  _malloc(size: number): number
  _free(ptr: number): void
  HEAPU8: Uint8Array
  getKpmInfo(ptr: number, length: number): KpmInfo
  getIKConfig(ptr: number, length: number): string
  getVersion(): string
  callMain(args: string[]): number
  FS: EmscriptenFS
}

/** Emscripten 虚拟文件系统接口 */
export interface EmscriptenFS {
  createDataFile(
    parent: string,
    name: string,
    data: Uint8Array,
    canRead: boolean,
    canWrite: boolean,
    canOwn?: boolean,
  ): void
  unlink(path: string): void
  rename(oldPath: string, newPath: string): void
  readFile(path: string, opts?: { encoding: 'binary' }): Uint8Array
  writeFile(path: string, data: Uint8Array, opts?: { encoding?: string }): void
  chdir(path: string): void
  cwd(): string
  mkdir(path: string): void
  exists(path: string): boolean
  rmdir(path: string): void
}

let moduleInstance: KpToolsModule | null = null
let loadingPromise: Promise<KpToolsModule> | null = null

/** kptools 模块初始化选项 */
export interface KpToolsOptions {
  noInitialRun?: boolean
  print?: (text: string) => void
  printErr?: (text: string) => void
  locateFile?: (path: string, scriptDir: string) => string
}

/**
 * 初始化 kptools WASM 模块（单例，重复调用返回同一实例）
 * @param options 可选 — 仅在首次初始化时生效
 */
export async function initKpTools(options?: KpToolsOptions): Promise<KpToolsModule> {
  if (moduleInstance) return moduleInstance
  if (loadingPromise) return loadingPromise

  loadingPromise = (async () => {
    // @ts-expect-error kptools.js 是 Emscripten 胶水代码，无类型声明
    const { default: createModule } = await import('../kptools.js')
    moduleInstance = (await createModule({
      noInitialRun: options?.noInitialRun ?? true,
      print: options?.print ?? undefined,
      printErr: options?.printErr ?? undefined,
      locateFile: options?.locateFile ?? ((path: string, _scriptDir: string) => {
        // 默认从 public/ 所在目录加载 .wasm
        return new URL(`../${path}`, import.meta.url).href
      }),
    })) as KpToolsModule
    return moduleInstance
  })()

  return loadingPromise
}

/**
 * 读取 KPM 模块文件的元信息（名称、版本、许可、作者、描述）
 */
export async function getKpmInfo(
  file: File
): Promise<{ success: true; content: KpmInfo } | { success: false; error: string }> {
  try {
    const worker = await createKpWorker()
    const array = await file.arrayBuffer()
    const content = await worker.getKpmInfo(array)
    return { success: true as const, content }
  } catch (e) {
    return { success: false as const, error: String(e) }
  }
}

/**
 * 获取内核镜像的 IKConfig 信息
 */
export async function getIKConfig(
  file: File
): Promise<{ success: true; content: string } | { success: false; error: string }> {
  try {
    const worker = await createKpWorker()
    const array = await file.arrayBuffer()
    const content = await worker.getIKConfig(array)
    return { success: true as const, content }
  } catch (e) {
    return { success: false as const, error: String(e) }
  }
}

/**
 * 获取 kptools 版本号
 */
export async function getVersion(): Promise<string> {
  const worker = await createKpWorker()
  return worker.getVersion()
}

// ─── 虚拟文件系统辅助函数 ────────────────────────────────

/**
 * 将 File 对象上传到 WASM 虚拟 FS 的指定目录
 */
export async function uploadToVfs(
  mod: KpToolsModule,
  file: File,
  parentDir = '/',
): Promise<void> {
  const bytes = new Uint8Array(await file.arrayBuffer())
  mod.FS.createDataFile(parentDir, file.name, bytes, true, true)
}

/**
 * 将 Uint8Array 以指定文件名写入虚拟 FS 的指定目录
 */
export function writeToVfs(
  mod: KpToolsModule,
  fileName: string,
  data: Uint8Array,
  parentDir = '/',
): void {
  mod.FS.createDataFile(parentDir, fileName, data, true, true)
}

/**
 * 从虚拟 FS 读取文件内容
 */
export function readFromVfs(mod: KpToolsModule, path: string): Uint8Array {
  return mod.FS.readFile(path, { encoding: 'binary' })
}

/**
 * 从虚拟 FS 删除文件
 */
export function deleteFromVfs(mod: KpToolsModule, path: string): void {
  mod.FS.unlink(path)
}

/**
 * 在虚拟 FS 中重命名文件
 */
export function renameInVfs(mod: KpToolsModule, oldPath: string, newPath: string): void {
  mod.FS.rename(oldPath, newPath)
}

/**
 * 触发浏览器下载文件
 */
export function downloadBlob(data: Uint8Array, fileName: string): void {
  const blob = new Blob([data as BlobPart])
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Web Worker 接口 ─────────────────────────────────────

export interface KpWorkerCallbacks {
  onStdout?: (text: string) => void
  onStderr?: (text: string) => void
}

export interface KpWorkerBridge {
  terminate(): void
  callMain(args: string[]): Promise<number>
  writeFile(name: string, data: ArrayBuffer): Promise<void>
  readFile(name: string): Promise<Uint8Array>
  unlink(path: string): Promise<void>
  rename(oldPath: string, newPath: string): Promise<void>
  getVersion(): Promise<string>
  getKpmInfo(data: ArrayBuffer): Promise<KpmInfo>
  getIKConfig(data: ArrayBuffer): Promise<string>
}

let workerPromise: Promise<KpWorkerBridge> | null = null
/** 可变的 callbacks 引用 — 每次调用 createKpWorker 都会更新 */
let currentCallbacks: KpWorkerCallbacks | undefined

/**
 * 创建 kptools Web Worker，所有操作在后台线程执行，不阻塞 UI
 * 单例，重复调用返回同一实例，但每次的 callbacks 会覆盖更新
 */
export async function createKpWorker(
  callbacks?: KpWorkerCallbacks,
): Promise<KpWorkerBridge> {
  // 更新 callbacks（即使 Worker 已存在也要更新）
  currentCallbacks = callbacks

  if (workerPromise) return workerPromise

  workerPromise = (async () => {
    // 1. 在主线程预加载 wasm 二进制（避免 Worker 内 locateFile 问题）
    const wasmResp = await fetch(new URL('../kptools.wasm', import.meta.url).href)
    if (!wasmResp.ok) throw new Error('无法加载 kptools.wasm')
    const wasmBinary = await wasmResp.arrayBuffer()

    // 2. 创建 Worker
    const worker = new Worker(
      new URL('./kptools.worker.ts', import.meta.url),
      { type: 'module' },
    )

    // 3. 消息路由
    const pending = new Map<string, {
      resolve: (value: any) => void
      reject: (err: Error) => void
    }>()
    let msgId = 0

    function send(msg: Record<string, unknown>): Promise<any> {
      return new Promise((resolve, reject) => {
        const id = String(++msgId)
        pending.set(id, { resolve, reject })
        worker.postMessage({ ...msg, _id: id })
      })
    }

    // 预注册 stdout/stderr 处理
    const pendingStdout: string[] = []
    const flushStdout = () => {
      if (pendingStdout.length && currentCallbacks?.onStdout) {
        for (const t of pendingStdout) currentCallbacks.onStdout(t)
        pendingStdout.length = 0
      }
    }

    worker.onmessage = (e: MessageEvent) => {
      const data = e.data
      const id = data._id

      switch (data.type) {
        case 'stdout':
          pendingStdout.push(data.text)
          if (currentCallbacks?.onStdout) currentCallbacks.onStdout(data.text)
          break
        case 'stderr':
          if (currentCallbacks?.onStderr) currentCallbacks.onStderr(data.text)
          break
        case 'ready':
          flushStdout()
          pending.get(id)?.resolve(undefined)
          pending.delete(id)
          break
        case 'ok':
        case 'callMainDone':
          flushStdout()
          pending.get(id)?.resolve(data.code ?? undefined)
          pending.delete(id)
          break
        case 'fileData':
          pending.get(id)?.resolve(new Uint8Array(data.data))
          pending.delete(id)
          break
        case 'existsResult':
          pending.get(id)?.resolve(data.exists)
          pending.delete(id)
          break
        case 'versionResult':
          pending.get(id)?.resolve(data.version)
          pending.delete(id)
          break
        case 'kpmInfoResult':
          pending.get(id)?.resolve(data.info)
          pending.delete(id)
          break
        case 'ikConfigResult':
          pending.get(id)?.resolve(data.config)
          pending.delete(id)
          break
        case 'error':
          pending.get(id)?.reject(new Error(data.message))
          pending.delete(id)
          break
      }
    }

    worker.onerror = (err: ErrorEvent) => {
      // 如有 pending 请求，全部 reject
      for (const [, p] of pending) p.reject(new Error(err.message))
      pending.clear()
    }

    // 4. 初始化 Worker（通过 send 携带 _id，与 ready 回复配对）
    await send({ type: 'init', wasmBinary })

    // 5. 返回桥接接口
    const bridge: KpWorkerBridge = {
      terminate: () => {
        worker.terminate()
        workerPromise = null
        currentCallbacks = undefined
      },
      callMain: (args: string[]) => send({ type: 'callMain', args }),
      writeFile: (name: string, data: ArrayBuffer) => send({ type: 'writeFile', name, data }),
      readFile: (name: string) => send({ type: 'readFile', name, path: `/${name}` }),
      unlink: (path: string) => send({ type: 'unlink', path }),
      rename: (oldPath: string, newPath: string) => send({ type: 'rename', oldPath, newPath }),
      getVersion: () => send({ type: 'getVersion' }),
      getKpmInfo: (data: ArrayBuffer) => send({ type: 'getKpmInfo', data }),
      getIKConfig: (data: ArrayBuffer) => send({ type: 'getIKConfig', data }),
    }
    return bridge
  })()

  return workerPromise
}
