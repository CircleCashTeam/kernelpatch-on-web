import type { KpmModule } from '../types/kernel'
import { getKpmInfo } from './kptools'

const DEFAULT_METADATA = {
  author: '未知作者',
  version: '1.0.0',
  license: 'MIT',
  description: 'KPM 内核模块',
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export async function parseKpmMetadata(file: File): Promise<{
  name: string
  author: string
  version: string
  license: string
  description: string
}> {
  const wasmResult = await getKpmInfo(file)
  if (!wasmResult.success) {
    throw new Error('无法解析 KPM 模块：WASM 解析失败')
  }

  const { name, author, version, license, description } = wasmResult.content
  if (!name) {
    throw new Error(`"${file.name}" 不是有效的 KPM 模块`)
  }

  return {
    name,
    author: author ?? DEFAULT_METADATA.author,
    version: version ?? DEFAULT_METADATA.version,
    license: license ?? DEFAULT_METADATA.license,
    description: description ?? 'KPM 内核模块',
  }
}

export async function normalizeKpmFile(file: File): Promise<KpmModule> {
  const metadata = await parseKpmMetadata(file)
  return {
    id: generateId(),
    file,
    name: metadata.name,
    author: metadata.author,
    version: metadata.version,
    license: metadata.license,
    description: metadata.description,
    event: 'pre-kernel-init',
    params: '',
    enabled: true,
    addedAt: new Date().toISOString(),
  }
}
