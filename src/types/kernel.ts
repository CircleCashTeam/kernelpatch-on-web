export interface BootImageFile {
  file: File
  name: string
  size: number
  uploadedAt: string
  kallsyms?: boolean | null
}

export interface KpmInfo {
  name?: string
  version?: string
  license?: string
  author?: string
  description?: string
}

export interface KpmModule {
  id: string
  file: File
  name: string
  author: string
  version: string
  license: string
  description: string
  event: string
  params: string
  enabled: boolean
  addedAt: string
}

export type KpmEvent =
  | 'pre-kernel-init'
  | 'post-kernel-init'
  | 'pre-mount'
  | 'post-mount'
  | 'pre-init'
  | 'post-init'
  | 'early-init'
  | 'late-init'

export const KPM_EVENT_OPTIONS: { label: string; value: KpmEvent }[] = [
  { label: 'Pre Kernel Init', value: 'pre-kernel-init' },
  { label: 'Post Kernel Init', value: 'post-kernel-init' },
  { label: 'Pre Mount', value: 'pre-mount' },
  { label: 'Post Mount', value: 'post-mount' },
  { label: 'Pre Init', value: 'pre-init' },
  { label: 'Post Init', value: 'post-init' },
  { label: 'Early Init', value: 'early-init' },
  { label: 'Late Init', value: 'late-init' },
]

export interface PatchConfig {
  bootImage: BootImageFile | null
  modules: KpmModule[]
}

export interface PatchResult {
  success: boolean
  message: string
  timestamp: string
}
