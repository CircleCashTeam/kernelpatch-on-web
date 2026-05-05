<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-100 px-6 py-3 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 shadow-sm dark:from-slate-600 dark:to-slate-800">
          <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">控制台日志</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">操作日志与状态信息</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {{ logs.length }} 条日志
        </span>
        <button
          @click="clearLogs"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          清空
        </button>
      </div>
    </div>

    <!-- Terminal -->
    <div ref="terminalRef" class="h-64 overflow-y-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed scroll-smooth">
      <div v-if="logs.length === 0" class="flex h-full flex-col items-center justify-center text-slate-600">
        <svg class="mb-2 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <p class="text-xs">等待操作日志...</p>
      </div>
      <div v-for="entry in logs" :key="entry.id" class="group flex gap-3 py-0.5">
        <span class="shrink-0 text-slate-600">{{ entry.timestamp }}</span>
        <span class="shrink-0 font-bold" :class="typeColor(entry.type)">[{{ entry.type.toUpperCase() }}]</span>
        <span class="text-slate-200">{{ entry.text }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useTerminalStore } from '../../stores/useTerminal'
import type { LogEntry } from '../../stores/useTerminal'

const terminalStore = useTerminalStore()
const { logs } = storeToRefs(terminalStore)
const terminalRef = ref<HTMLElement | null>(null)

function clearLogs() {
  terminalStore.clearLogs()
}

function typeColor(type: LogEntry['type']) {
  switch (type) {
    case 'success': return 'text-emerald-400'
    case 'error': return 'text-red-400'
    case 'warning': return 'text-amber-400'
    case 'system': return 'text-violet-400'
    default: return 'text-sky-400'
  }
}

watch(logs, () => {
  nextTick(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight
    }
  })
}, { deep: true })
</script>
