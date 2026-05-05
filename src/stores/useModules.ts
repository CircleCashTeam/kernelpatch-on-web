import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BootImageFile, KpmModule } from '../types/kernel'

export type PatchMode = 'android' | 'linux'

export const useModulesStore = defineStore('modules', () => {
  const bootImage = ref<BootImageFile | null>(null)
  const modules = ref<KpmModule[]>([])
  const mode = ref<PatchMode>('android')
  const rootKey = ref('')

  const enabledModules = computed(() => modules.value.filter((m) => m.enabled))
  const disabledModules = computed(() => modules.value.filter((m) => !m.enabled))
  const moduleCount = computed(() => modules.value.length)
  const hasBootImage = computed(() => bootImage.value !== null)

  function setBootImage(file: BootImageFile) {
    bootImage.value = file
  }

  function clearBootImage() {
    bootImage.value = null
  }

  function addKpmModule(module: KpmModule) {
    modules.value.push(module)
  }

  function removeModule(id: string) {
    modules.value = modules.value.filter((m) => m.id !== id)
  }

  function updateModule(id: string, patch: Partial<KpmModule>) {
    const idx = modules.value.findIndex((m) => m.id === id)
    if (idx !== -1) {
      modules.value[idx] = { ...modules.value[idx], ...patch }
    }
  }

  function toggleModuleEnabled(id: string) {
    const module = modules.value.find((m) => m.id === id)
    if (module) {
      module.enabled = !module.enabled
    }
  }

  function moveModule(fromIndex: number, toIndex: number) {
    const newModules = [...modules.value]
    const [removed] = newModules.splice(fromIndex, 1)
    newModules.splice(toIndex, 0, removed)
    modules.value = newModules
  }

  function clearModules() {
    modules.value = []
  }

  function clearAll() {
    modules.value = []
    bootImage.value = null
  }

  return {
    bootImage, modules, enabledModules, disabledModules, moduleCount, hasBootImage,
    mode, rootKey,
    setBootImage, clearBootImage, addKpmModule, removeModule, updateModule,
    toggleModuleEnabled, moveModule, clearModules, clearAll,
  }
})
