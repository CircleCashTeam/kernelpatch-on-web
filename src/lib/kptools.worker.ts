/** kptools Web Worker — 在后台线程运行 kptools WASM */

let kpModule: any = null

self.onmessage = async (e: MessageEvent) => {
  const msg = e.data

  try {
    switch (msg.type) {
      case 'init': {
        // @ts-expect-error kptools.js 是 Emscripten 胶水代码
        const { default: createModule } = await import('../kptools.js')
        kpModule = await createModule({
          noInitialRun: true,
          wasmBinary: msg.wasmBinary,
          print: (text: string) => self.postMessage({ type: 'stdout', text }),
          printErr: (text: string) => self.postMessage({ type: 'stderr', text }),
        })
        self.postMessage({ type: 'ready', _id: msg._id })
        break
      }

      case 'callMain': {
        const ret = kpModule.callMain(msg.args)
        self.postMessage({ type: 'callMainDone', code: ret, _id: msg._id })
        break
      }

      case 'writeFile': {
        const data = new Uint8Array(msg.data)
        kpModule.FS.createDataFile('/', msg.name, data, true, true)
        self.postMessage({ type: 'ok', _id: msg._id })
        break
      }

      case 'readFile': {
        const data = kpModule.FS.readFile(msg.path, { encoding: 'binary' }) as Uint8Array
        // Transfer the buffer to avoid copy
        // 拷贝一份返回，避免跨线程 transfer 的类型问题
        const copy = new Uint8Array(data.length)
        copy.set(data)
        self.postMessage({ type: 'fileData', name: msg.name, data: copy.buffer, _id: msg._id })
        break
      }

      case 'unlink': {
        kpModule.FS.unlink(msg.path)
        self.postMessage({ type: 'ok', _id: msg._id })
        break
      }

      case 'rename': {
        kpModule.FS.rename(msg.oldPath, msg.newPath)
        self.postMessage({ type: 'ok', _id: msg._id })
        break
      }

      case 'exists': {
        const exists = kpModule.FS.exists(msg.path)
        self.postMessage({ type: 'existsResult', path: msg.path, exists, _id: msg._id })
        break
      }

      case 'getVersion': {
        const ver = kpModule.getVersion()
        self.postMessage({ type: 'versionResult', version: ver, _id: msg._id })
        break
      }

      case 'getKpmInfo': {
        const data = new Uint8Array(msg.data)
        const ptr = kpModule._malloc(data.length)
        kpModule.HEAPU8.set(data, ptr)
        let info: any
        try {
          info = kpModule.getKpmInfo(ptr, data.length)
        } finally {
          kpModule._free(ptr)
        }
        self.postMessage({ type: 'kpmInfoResult', info, _id: msg._id })
        break
      }

      case 'getIKConfig': {
        const data2 = new Uint8Array(msg.data)
        const ptr2 = kpModule._malloc(data2.length)
        kpModule.HEAPU8.set(data2, ptr2)
        let config: string
        try {
          config = kpModule.getIKConfig(ptr2, data2.length)
        } finally {
          kpModule._free(ptr2)
        }
        self.postMessage({ type: 'ikConfigResult', config, _id: msg._id })
        break
      }

      default:
        self.postMessage({ type: 'error', message: `未知消息类型: ${msg.type}` })
    }
  } catch (err: any) {
    self.postMessage({
      type: 'error',
      message: err.message ?? String(err),
      detail: err.stack ?? undefined,
      _id: msg._id,
    })
  }
}
