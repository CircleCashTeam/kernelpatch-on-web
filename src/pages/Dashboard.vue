<template>
  <div class="space-y-6">
    <!-- Hero Section -->
    <div class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm dark:border-slate-800/70 dark:from-slate-950 dark:to-slate-900/80 sm:p-8">
      <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/10 blur-2xl dark:from-sky-500/15 dark:to-indigo-500/15" />
      <div class="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 blur-2xl dark:from-emerald-500/15 dark:to-teal-500/15" />

      <div class="relative">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">控制中心</p>
            <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">内核补丁工作台</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              上传 boot.img 或内核映像，加载 .kpm 内核模块，编辑事件触发与运行参数，一键执行补丁操作。
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              @click="runPatchSimulation"
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-sky-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!canRunPatch"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              执行补丁
            </button>
            <button
              @click="clearAll"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              重置
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">内核映像</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ bootImage ? '已上传' : '未上传' }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">KPM 模块</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ moduleCount }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">已启用</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ enabledCount }}/{{ moduleCount }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">日志数</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ logCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Config: Mode + Password -->
    <div class="grid gap-4 sm:grid-cols-2">
      <!-- Mode Selector -->
      <div class="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">补丁模式</label>
        <p class="mt-0.5 text-xs text-slate-400">选择内核映像类型</p>
        <div class="mt-3 flex gap-2">
          <button
            @click="modulesStore.mode = 'android'"
            type="button"
            class="flex-1 rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-all"
            :class="modulesStore.mode === 'android'
              ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-sm dark:border-sky-500 dark:bg-sky-950/60 dark:text-sky-400'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-950'"
          >
            <span class="block text-base">📱</span>
            <span class="mt-0.5 block">Android</span>
            <span class="mt-0.5 block text-xs text-slate-400">boot.img 解包 → 修补 → 打包</span>
          </button>
          <button
            @click="modulesStore.mode = 'linux'"
            type="button"
            class="flex-1 rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-all"
            :class="modulesStore.mode === 'linux'
              ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-sm dark:border-sky-500 dark:bg-sky-950/60 dark:text-sky-400'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-950'"
          >
            <span class="block text-base">🐧</span>
            <span class="mt-0.5 block">Linux</span>
            <span class="mt-0.5 block text-xs text-slate-400">直接修补内核映像</span>
          </button>
        </div>
      </div>

      <!-- Password Input -->
      <div class="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
          启动密码 <span class="text-red-500">*</span>
        </label>
        <p class="mt-0.5 text-xs text-slate-400">设置内核启动密码保护，必须包含字母和数字</p>
        <div class="mt-3">
          <input
            v-model="modulesStore.password"
            type="text"
            placeholder="请输入启动密码"
            :class="[
              'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2',
              modulesStore.passwordError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500'
                : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500'
            ]"
          />
          <p v-if="modulesStore.passwordError" class="mt-1.5 text-xs text-red-500">
            {{ modulesStore.passwordError }}
          </p>
        </div>
      </div>
    </div>

    <!-- File Upload -->
    <FileUploadZone />

    <!-- Module List -->
    <ModuleList @edit="openEditor" />

    <!-- Terminal -->
    <TerminalConsole />

    <!-- Module Editor Modal -->
    <ModuleEditor :module-id="editingModuleId" @close="closeEditor" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useModulesStore } from '../stores/useModules'
import { useTerminalStore } from '../stores/useTerminal'
import FileUploadZone from '../components/file-upload/FileUploadZone.vue'
import ModuleList from '../components/modules/ModuleList.vue'
import ModuleEditor from '../components/modules/ModuleEditor.vue'
import TerminalConsole from '../components/terminal/TerminalConsole.vue'
import { downloadBlob, type KpWorkerBridge } from '../lib/kptools'

const modulesStore = useModulesStore()
const terminalStore = useTerminalStore()

const bootImage = computed(() => modulesStore.bootImage)
const moduleCount = computed(() => modulesStore.moduleCount)
const enabledCount = computed(() => modulesStore.enabledModules.length)
const logCount = computed(() => terminalStore.logs.length)
const canRunPatch = computed(() => modulesStore.hasBootImage)

const editingModuleId = ref<string | null>(null)

function openEditor(id: string) {
  editingModuleId.value = id
}

function closeEditor() {
  editingModuleId.value = null
}

function clearAll() {
  modulesStore.clearAll()
  terminalStore.appendLog('🔄 已重置所有状态', 'system')
}

async function runPatchSimulation() {
  if (!modulesStore.bootImage) {
    terminalStore.appendLog('❌ 请先上传 boot.img 或内核映像', 'error')
    return
  }

  if (modulesStore.passwordError) {
    terminalStore.appendLog(`❌ ${modulesStore.passwordError}`, 'error')
    return
  }

  const boot = modulesStore.bootImage
  const activeModules = modulesStore.enabledModules
  const isAndroid = modulesStore.mode === 'android'
  const password = modulesStore.password

  terminalStore.appendLog('═══════════════════════════════════════', 'system')
  terminalStore.appendLog(`🚀 开始补丁: ${boot.name}`, 'system')
  terminalStore.appendLog(`🔧 模式: ${isAndroid ? '📱 Android (boot.img)' : '🐧 Linux (内核映像)'}`, 'system')
  if (activeModules.length > 0) {
    terminalStore.appendLog(`📦 启用模块: ${activeModules.length}/${modulesStore.modules.length}`, 'system')
  } else {
    terminalStore.appendLog('📦 未添加 KPM 模块，仅执行内核补丁', 'system')
  }
  terminalStore.appendLog(`🔑 启动密码: ${'*'.repeat(password.length)}`, 'system')
  terminalStore.appendLog('───────────────────────────────────────', 'system')

  const kpimgName = isAndroid ? 'kpimg-android' : 'kpimg-linux'
  const kernelName = isAndroid ? 'kernel' : boot.name
  let worker: KpWorkerBridge | null = null

  async function step(label: string, fn: () => Promise<void> | void) {
    try {
      terminalStore.appendLog(`⏳ ${label}...`, 'info')
      await fn()
      terminalStore.appendLog(`✅ ${label}`, 'success')
    } catch (e: unknown) {
      const detail = e instanceof Error ? e.message
        : typeof e === 'object' && e !== null
          ? JSON.stringify(e, Object.getOwnPropertyNames(e))
          : String(e)
      terminalStore.appendLog(`❌ ${label} 失败: ${detail}`, 'error')
      console.error(`Step "${label}" failed:`, e)
      throw e
    }
  }

  try {
    // 0. 初始化 — 创建 Worker，在后台线程加载 kptools
    terminalStore.appendLog('⏳ 初始化 kptools...', 'info')
    const kptools = await import('../lib/kptools')
    worker = await kptools.createKpWorker({
      onStdout: (text: string) => terminalStore.appendLog(text, 'info'),
      onStderr: (text: string) => terminalStore.appendLog(text, 'warning'),
    })
    terminalStore.appendLog('✅ 初始化 kptools', 'success')

    // 1. 上传 boot.img / 内核映像到虚拟 FS
    await step('上传映像到虚拟文件系统', async () => {
      const bootBytes = await boot.file.arrayBuffer()
      await worker!.writeFile(boot.name, bootBytes)
    })

    // 2. Android 模式：解包 boot.img
    if (isAndroid) {
      await step('解包 boot.img', async () => {
        await worker!.callMain(['unpack', boot.name])
      })
    }

    // 3. 上传所有启用的 KPM 模块
    if (activeModules.length > 0) {
      await step('上传 KPM 模块', async () => {
        for (const m of activeModules) {
          const bytes = await m.file.arrayBuffer()
          await worker!.writeFile(m.file.name, bytes)
        }
      })
    }

    // 4. 上传 kpimg 签名映像
    await step('上传签名映像', async () => {
      const kpimgResp = await fetch(`/${kpimgName}`)
      if (!kpimgResp.ok) throw new Error(`无法获取 ${kpimgName}`)
      const kpimgBytes = await kpimgResp.arrayBuffer()
      await worker!.writeFile(kpimgName, kpimgBytes)
    })

    // 5. 执行内核补丁
    await step('执行内核补丁', async () => {
      const args: string[] = [
        '-p', '--image', kernelName,
        '--kpimg', kpimgName,
        '--skey', password,
        '--out', 'kernel_b',
      ]

      // 为每个启用的 KPM 模块构造参数
      if (activeModules.length > 0) {
        for (const m of activeModules) {
          args.push('-M', m.file.name)
          if (m.params?.trim()) {
            args.push('-A', m.params)
          }
          if (m.event?.trim()) {
            args.push('-V', m.event)
          }
          args.push('-T', 'kpm')
        }
        terminalStore.appendLog(`📦 注入 ${activeModules.length} 个 KPM 模块`, 'system')
      }

      await worker!.callMain(args)
    })

    // 6. 替换内核文件
    await step('替换内核', async () => {
      await worker!.unlink(`/${kernelName}`)
      await worker!.rename('kernel_b', kernelName)
    })

    // 7. 下载结果
    await step('下载结果', async () => {
      if (isAndroid) {
        await worker!.callMain(['repack', boot.name])
        const result = await worker!.readFile('new-boot.img')
        downloadBlob(result, 'new-boot.img')
      } else {
        const result = await worker!.readFile(kernelName)
        downloadBlob(result, `patched-${boot.name}`)
      }
    })

    terminalStore.appendLog('═══════════════════════════════════════', 'system')
    terminalStore.appendLog('🎉 补丁流程全部完成！', 'success')
  } catch (e) {
    terminalStore.appendLog('───────────────────────────────────────', 'system')
    terminalStore.appendLog('❌ 补丁流程异常终止', 'error')
  } finally {
    // 释放 Worker
    worker?.terminate()
  }
}
</script>
