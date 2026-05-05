<template>
  <button
    @click="toggle"
    type="button"
    class="relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950"
    :class="darkMode ? 'bg-sky-600' : 'bg-slate-300'"
    :aria-label="darkMode ? '切换为浅色模式' : '切换为暗色模式'"
  >
    <span
      class="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300"
      :class="darkMode ? 'translate-x-5' : 'translate-x-0'"
    >
      <span v-if="darkMode" class="text-xs">🌙</span>
      <span v-else class="text-xs">☀️</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '../../stores/useUi'

const uiStore = useUiStore()
const darkMode = computed(() => uiStore.darkMode)
const toggle = () => uiStore.toggleDarkMode()
</script>
