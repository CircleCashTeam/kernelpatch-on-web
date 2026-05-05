<template>
  <div class="space-y-6">
    <!-- Version Header -->
    <div class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm dark:border-slate-800/70 dark:from-slate-950 dark:to-slate-900/80 sm:p-8">
      <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-3xl dark:from-violet-500/15 dark:to-purple-500/15" />
      <div class="relative">
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
            <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">版本信息</p>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">v{{ displayVersion }}</h1>
            <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">构建日期: 2026-05-05</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Current / Latest -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 0l2.25-2.25M12 12.75l-2.25-2.25" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">当前版本</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">
              <template v-if="loading">加载中...</template>
              <template v-else>v{{ displayVersion }}</template>
            </p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">最新版本</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">
              <template v-if="latestLoading">检查中...</template>
              <template v-else-if="latestError">获取失败</template>
              <template v-else>v{{ latestVersion }}</template>
            </p>
          </div>
        </div>
        <div v-if="!latestLoading && !latestError && latestVersion !== displayVersion" class="mt-3">
          <span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0c0 4.5-4.5 9-9 9s-9-4.5-9-9 4.5-9 9-9c2.5 0 4.5 1 6 2.5L21 7l-3-1" />
            </svg>
            有新版本可用
          </span>
        </div>
        <div v-else-if="!latestLoading && !latestError && latestVersion === displayVersion" class="mt-3">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            已是最新
          </span>
        </div>
      </div>
    </div>

    <!-- Tech Stack -->
    <div class="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
      <h2 class="text-base font-semibold text-slate-900 dark:text-white">技术栈</h2>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <div v-for="item in techStack" :key="item.label" class="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
          <span class="text-sm text-slate-600 dark:text-slate-400">{{ item.label }}</span>
          <span class="text-sm font-medium text-slate-900 dark:text-white">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- Changelog -->
    <div class="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">更新日志</h2>
        <a
          href="https://github.com/CircleCashTeam/kernelpatch-on-web/commits/main"
          target="_blank"
          class="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          在 GitHub 上查看
        </a>
      </div>
      <div v-if="changelogLoading" class="mt-4 flex items-center justify-center py-8 text-sm text-slate-400">
        <svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        加载提交记录...
      </div>
      <div v-else-if="changelogError" class="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
        无法获取提交记录，请稍后再试。
      </div>
      <div v-else class="mt-4 space-y-4">
        <div v-for="log in changelog" :key="log.date" class="border-l-2 border-sky-200 pl-4 dark:border-sky-800">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ log.date }}</span>
          </div>
          <ul class="mt-2 space-y-1 pl-1 text-sm text-slate-600 dark:text-slate-400">
            <li v-for="item in log.items" :key="item.sha" class="flex items-start gap-2">
              <a
                :href="`https://github.com/CircleCashTeam/kernelpatch-on-web/commit/${item.sha}`"
                target="_blank"
                class="group flex items-start gap-1.5 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
              >
                <svg class="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>{{ item.message }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ChangelogEntry {
  date: string
  items: { message: string; sha: string }[]
}

const displayVersion = ref('?')
const loading = ref(true)
const latestVersion = ref('')
const latestLoading = ref(true)
const latestError = ref(false)

const changelog = ref<ChangelogEntry[]>([])
const changelogLoading = ref(true)
const changelogError = ref(false)

onMounted(async () => {
  // 当前版本
  try {
    const { getVersion, formatKpVersion } = await import('../lib/kptools')
    const hex = await getVersion()
    displayVersion.value = formatKpVersion(hex)
  } catch {
    displayVersion.value = '?'
  } finally {
    loading.value = false
  }

  // 最新版本（GitHub API — KernelPatch tags）
  try {
    const resp = await fetch('https://api.github.com/repos/bmax121/KernelPatch/tags?per_page=1')
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const tags = await resp.json()
    const tag = tags[0]?.name ?? ''
    latestVersion.value = tag.replace(/^v/i, '')
  } catch {
    latestError.value = true
  } finally {
    latestLoading.value = false
  }

  // 更新日志（GitHub Commits API — 自己的仓库）
  try {
    const resp = await fetch('https://api.github.com/repos/CircleCashTeam/kernelpatch-on-web/commits?sha=main&per_page=50')
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const commits = await resp.json()
    const groups: Record<string, { message: string; sha: string }[]> = {}
    for (const c of commits) {
      const date = (c.commit.author?.date ?? c.commit.committer?.date ?? '').slice(0, 10)
      if (!date) continue
      if (!groups[date]) groups[date] = []
      const msg = c.commit.message.split('\n')[0]
      groups[date].push({ message: msg, sha: c.sha })
    }
    changelog.value = Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, items]) => ({ date, items }))
  } catch {
    changelogError.value = true
  } finally {
    changelogLoading.value = false
  }
})

const techStack = [
  { label: 'UI 框架', value: 'Vue 3 + Vite 8' },
  { label: '状态管理', value: 'Pinia 3' },
  { label: '路由', value: 'Vue Router 4' },
  { label: '样式方案', value: 'Tailwind CSS 3' },
  { label: '语言', value: 'TypeScript 6' },
  { label: '构建工具', value: 'Vite 8' },
]
</script>
