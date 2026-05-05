<template>
  <div
    class="group relative overflow-hidden rounded-xl border transition-all duration-200"
    :class="[
      module.enabled
        ? 'border-slate-200 bg-white/90 shadow-sm hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/80'
        : 'border-slate-200/60 bg-slate-50/70 opacity-70 dark:border-slate-800/60 dark:bg-slate-950/50',
    ]"
  >
    <!-- Top bar -->
    <div class="flex items-start gap-3 px-5 pt-5">
      <!-- Drag handle -->
      <div class="mt-0.5 cursor-grab touch-none text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8-16a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
      </div>

      <!-- Main info -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-base font-semibold text-slate-900 dark:text-white truncate">{{ module.name }}</h3>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-400">
              v{{ module.version }}
            </span>
            <span class="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              {{ module.license }}
            </span>
          </div>
        </div>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{{ module.description }}</p>
      </div>

      <!-- Enable toggle -->
      <button
        @click="$emit('toggle', module.id)"
        type="button"
        class="relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        :class="module.enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'"
      >
        <span class="inline-flex h-4 w-4 transform items-center justify-center rounded-full bg-white shadow-sm transition-transform" :class="module.enabled ? 'translate-x-5' : 'translate-x-1'" />
      </button>
    </div>

    <!-- Metadata grid -->
    <div class="mt-3 grid grid-cols-2 gap-2 px-5">
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-950/60">
        <svg class="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span class="truncate text-xs text-slate-600 dark:text-slate-400">{{ module.author }}</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-950/60">
        <svg class="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="truncate text-xs text-slate-600 dark:text-slate-400">{{ module.event }}</span>
      </div>
    </div>

    <!-- Params -->
    <div v-if="module.params" class="mx-5 mt-1">
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-950/60">
        <svg class="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        <span class="truncate text-xs text-slate-600 dark:text-slate-400">{{ module.params }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-3 flex items-center gap-1 border-t border-slate-100 px-3 py-2 dark:border-slate-800">
      <button
        @click="$emit('edit', module.id)"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
      >
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        编辑
      </button>
      <button
        @click="$emit('remove', module.id)"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
      >
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        删除
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KpmModule } from '../../types/kernel'

defineProps<{ module: KpmModule }>()
defineEmits<{
  (e: 'edit', id: string): void
  (e: 'remove', id: string): void
  (e: 'toggle', id: string): void
}>()
</script>
