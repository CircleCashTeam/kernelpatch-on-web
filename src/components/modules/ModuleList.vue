<template>
  <section class="rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
          <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
        <div>
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">KPM 模块列表</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">管理已上传的内核模块</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div v-if="modules.length" class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            启用 {{ enabledCount }}
          </span>
          <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            总计 {{ modules.length }}
          </span>
        </div>
        <button
          v-if="modules.length"
          @click="clearAll"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          清空全部
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!modules.length" class="flex flex-col items-center py-16">
      <div class="mb-4 rounded-full bg-slate-100 p-4 dark:bg-slate-800">
        <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <p class="text-sm font-medium text-slate-600 dark:text-slate-400">暂无 KPM 模块</p>
      <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">请先上传 .kpm 文件</p>
    </div>

    <!-- Module list -->
    <div v-else class="divide-y divide-slate-100 dark:divide-slate-800">
      <ModuleCard
        v-for="module in modules"
        :key="module.id"
        :module="module"
        @edit="(id: string) => $emit('edit', id)"
        @remove="(id: string) => removeModule(id)"
        @toggle="(id: string) => toggleModule(id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useModulesStore } from '../../stores/useModules'
import { useTerminalStore } from '../../stores/useTerminal'
import ModuleCard from './ModuleCard.vue'

const emit = defineEmits<{
  (e: 'edit', id: string): void
}>()

const modulesStore = useModulesStore()
const terminalStore = useTerminalStore()

const modules = computed(() => modulesStore.modules)
const enabledCount = computed(() => modulesStore.enabledModules.length)

function removeModule(id: string) {
  const m = modulesStore.modules.find((m) => m.id === id)
  modulesStore.removeModule(id)
  terminalStore.appendLog(`🗑️ 模块已删除: ${m?.name ?? id}`, 'warning')
}

function toggleModule(id: string) {
  modulesStore.toggleModuleEnabled(id)
  const m = modulesStore.modules.find((m) => m.id === id)
  terminalStore.appendLog(`模块 ${m?.name} ${m?.enabled ? '已启用' : '已禁用'}`, 'info')
}

function clearAll() {
  modulesStore.clearModules()
  terminalStore.appendLog('🧹 所有 KPM 模块已清空', 'system')
}
</script>
