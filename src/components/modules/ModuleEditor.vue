<template>
  <Transition name="modal">
    <div v-if="module" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" @click.self="cancel">
      <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">模块编辑</p>
            <h2 class="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">{{ module.name }}</h2>
          </div>
          <button @click="cancel" type="button" class="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="space-y-5 px-6 py-5">
          <!-- Event Input -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">事件触发 Event</label>
            <p class="mt-0.5 text-xs text-slate-400">填写内核启动阶段的 hook 点名称</p>
            <input
              v-model="event"
              type="text"
              placeholder="例如: pre-kernel-init"
              class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500"
            />
          </div>

          <!-- Params -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">运行参数 Param</label>
            <p class="mt-0.5 text-xs text-slate-400">传递给模块的额外命令行参数（可选）</p>
            <input
              v-model="params"
              type="text"
              placeholder="例如: --verbose --timeout=30"
              class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <button @click="cancel" type="button" class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">取消</button>
          <button @click="save" type="button" class="rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-sky-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50">
            保存更改
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModulesStore } from '../../stores/useModules'
import { useTerminalStore } from '../../stores/useTerminal'
import type { KpmModule } from '../../types/kernel'

const props = defineProps<{
  moduleId: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modulesStore = useModulesStore()
const terminalStore = useTerminalStore()

const module = ref<KpmModule | null>(null)
const event = ref('')
const params = ref('')

watch(() => props.moduleId, (id) => {
  if (id) {
    const found = modulesStore.modules.find((m) => m.id === id)
    if (found) {
      module.value = found
      event.value = found.event
      params.value = found.params
    }
  } else {
    module.value = null
  }
}, { immediate: true })

function save() {
  if (!module.value) return
  modulesStore.updateModule(module.value.id, { event: event.value, params: params.value })
  terminalStore.appendLog(`模块已更新: ${module.value.name}，事件=${event.value}，参数=${params.value || '无'}`, 'success')
  emit('close')
}

function cancel() {
  emit('close')
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95);
  opacity: 0;
}
</style>
