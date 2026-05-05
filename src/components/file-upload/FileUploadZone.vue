<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Boot Image Upload -->
    <div
      class="group relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300"
      :class="bootDragOver
        ? 'border-sky-400 bg-sky-50/80 shadow-lg shadow-sky-500/10 dark:border-sky-500 dark:bg-sky-950/40'
        : 'border-slate-200 bg-white/80 hover:border-slate-300 dark:border-slate-700/80 dark:bg-slate-900/60 dark:hover:border-slate-600'"
      @dragover.prevent="bootDragOver = true"
      @dragleave.prevent="bootDragOver = false"
      @drop.prevent="onBootDrop"
    >
      <!-- Decoration -->
      <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky-500/5 to-indigo-500/5 dark:from-sky-500/10 dark:to-indigo-500/10" />

      <div class="relative">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-sm">
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">上传内核 / boot.img</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">支持 .img / .boot / .elf 格式</p>
          </div>
        </div>

        <!-- Drop zone -->
        <div
          class="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors"
          :class="bootDragOver
            ? 'border-sky-400 bg-sky-100/50 dark:border-sky-500 dark:bg-sky-950/30'
            : 'border-slate-300 bg-slate-50/50 hover:bg-slate-100/50 dark:border-slate-600 dark:bg-slate-950/30 dark:hover:bg-slate-950/50'"
          @click="selectBoot"
        >
          <div class="mb-3 rounded-full bg-sky-100 p-3 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
            <span class="text-sky-600 dark:text-sky-400">点击上传</span> 或拖放文件到此处
          </p>
          <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">最大支持 500MB</p>
          <input ref="bootInput" type="file" accept=".img,.boot,.elf" class="hidden" @change="handleBootUpload" />
        </div>

        <!-- Uploaded info -->
        <Transition name="fade" mode="out-in">
          <div v-if="bootImage" key="uploaded" class="mt-4 space-y-2">
            <div class="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3 dark:border-sky-800 dark:bg-sky-950/50">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="truncate text-sm font-medium text-slate-900 dark:text-white">{{ bootImage.name }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatSize(bootImage.size) }}</p>
              </div>
              <button @click="clearBootImage" class="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-sky-100 hover:text-red-500 dark:hover:bg-sky-950 dark:hover:text-red-400" title="移除">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
            <!-- KALLSYMS 检测结果 -->
            <div v-if="bootImage.kallsyms === true" class="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/40">
              <svg class="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs font-medium text-emerald-700 dark:text-emerald-300">检测到 KALLSYMS=y</span>
            </div>
            <div v-else-if="bootImage.kallsyms === false" class="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 dark:border-amber-800 dark:bg-amber-950/40">
              <svg class="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span class="text-xs font-medium text-amber-700 dark:text-amber-300">未检测到 KALLSYMS=y，可能无法正常工作</span>
            </div>
            <div v-else-if="bootImage.kallsyms === null" class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-950/40">
              <svg class="h-4 w-4 shrink-0 animate-spin text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              <span class="text-xs text-slate-500 dark:text-slate-400">正在检测 KALLSYMS 配置...</span>
            </div>
          </div>
          <p v-else key="empty" class="mt-3 text-xs text-slate-400 dark:text-slate-500">尚未上传任何镜像文件</p>
        </Transition>
      </div>
    </div>

    <!-- KPM Module Upload -->
    <div
      class="group relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300"
      :class="moduleDragOver
        ? 'border-emerald-400 bg-emerald-50/80 shadow-lg shadow-emerald-500/10 dark:border-emerald-500 dark:bg-emerald-950/40'
        : 'border-slate-200 bg-white/80 hover:border-slate-300 dark:border-slate-700/80 dark:bg-slate-900/60 dark:hover:border-slate-600'"
      @dragover.prevent="moduleDragOver = true"
      @dragleave.prevent="moduleDragOver = false"
      @drop.prevent="onModuleDrop"
    >
      <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10" />

      <div class="relative">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l-4.5-4.5m4.5 4.5l4.5-4.5" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">上传 KPM 模块</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">支持上传多个 .kpm 内核模块</p>
          </div>
          <span v-if="moduleCount > 0" class="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            {{ moduleCount }} 个模块
          </span>
        </div>

        <div
          class="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors"
          :class="moduleDragOver
            ? 'border-emerald-400 bg-emerald-100/50 dark:border-emerald-500 dark:bg-emerald-950/30'
            : 'border-slate-300 bg-slate-50/50 hover:bg-slate-100/50 dark:border-slate-600 dark:bg-slate-950/30 dark:hover:bg-slate-950/50'"
          @click="selectModule"
        >
          <div class="mb-3 rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
            <span class="text-emerald-600 dark:text-emerald-400">点击选择</span> 或拖放 .kpm 文件到此处
          </p>
          <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">支持批量上传，每个模块可独立配置</p>
          <input ref="moduleInput" type="file" accept=".kpm" multiple class="hidden" @change="handleModulesUpload" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useModulesStore } from '../../stores/useModules'
import { useTerminalStore } from '../../stores/useTerminal'
import type { BootImageFile } from '../../types/kernel'

const modulesStore = useModulesStore()
const terminalStore = useTerminalStore()
const bootInput = ref<HTMLInputElement | null>(null)
const moduleInput = ref<HTMLInputElement | null>(null)
const bootDragOver = ref(false)
const moduleDragOver = ref(false)

const bootImage = computed(() => modulesStore.bootImage)
const moduleCount = computed(() => modulesStore.moduleCount)

function selectBoot() { bootInput.value?.click() }
function selectModule() { moduleInput.value?.click() }

function clearBootImage() {
  modulesStore.clearBootImage()
  terminalStore.appendLog('已移除 boot.img', 'warning')
}

async function onBootDrop(e: DragEvent) {
  bootDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) processBootFile(file)
}

async function onModuleDrop(e: DragEvent) {
  moduleDragOver.value = false
  const files = e.dataTransfer?.files
  if (files) processModuleFiles(Array.from(files))
}

function handleBootUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) processBootFile(file)
  target.value = ''
}

async function handleModulesUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) processModuleFiles(Array.from(files))
  target.value = ''
}

function processBootFile(file: File) {
  if (!file.name.match(/\.(img|boot|elf)$/i)) {
    terminalStore.appendLog(`不支持的文件格式: ${file.name}`, 'error')
    return
  }
  const payload: BootImageFile = {
    file,
    name: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    kallsyms: null,
  }
  modulesStore.setBootImage(payload)
  terminalStore.appendLog(`✅ boot.img 已上传: ${file.name} (${formatSize(file.size)})`, 'success')

  // 异步检测 KALLSYMS 配置
  detectKallsyms(file)
}

async function detectKallsyms(file: File) {
  try {
    const { getIKConfig } = await import('../../lib/kptools')
    const result = await getIKConfig(file)
    if (result.success) {
      const hasKallsyms = result.content.includes('KALLSYMS=y')
      modulesStore.bootImage = modulesStore.bootImage
        ? { ...modulesStore.bootImage, kallsyms: hasKallsyms }
        : null
      if (hasKallsyms) {
        terminalStore.appendLog('🔍 检测到 KALLSYMS=y，内核支持模块注入', 'success')
      } else {
        terminalStore.appendLog('⚠️ 未检测到 KALLSYMS=y，内核可能无法加载模块', 'warning')
      }
    } else {
      modulesStore.bootImage = modulesStore.bootImage
        ? { ...modulesStore.bootImage, kallsyms: false }
        : null
      terminalStore.appendLog(`⚠️ IKConfig 解析失败: ${result.error}`, 'warning')
    }
  } catch (e) {
    modulesStore.bootImage = modulesStore.bootImage
      ? { ...modulesStore.bootImage, kallsyms: false }
      : null
    terminalStore.appendLog(`⚠️ KALLSYMS 检测出错: ${e}`, 'error')
  }
}

async function processModuleFiles(files: File[]) {
  for (const file of files) {
    if (!file.name.endsWith('.kpm')) {
      terminalStore.appendLog(`跳过非 .kpm 文件: ${file.name}`, 'warning')
      continue
    }
    const { normalizeKpmFile } = await import('../../lib/kpm-parser')
    const module = await normalizeKpmFile(file)
    modulesStore.addKpmModule(module)
    terminalStore.appendLog(`✅ KPM 模块已加载: ${module.name} v${module.version}`, 'success')
  }
}

function formatSize(size: number) {
  if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`
  if (size > 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${size} B`
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
