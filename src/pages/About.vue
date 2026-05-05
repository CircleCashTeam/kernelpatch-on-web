<template>
  <div class="space-y-6">
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm dark:border-slate-800/70 dark:from-slate-950 dark:to-slate-900/80 sm:p-8">
      <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/10 blur-3xl dark:from-sky-500/15 dark:to-indigo-500/15" />
      <div class="relative">
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg">
            <span class="text-2xl font-bold text-white">KP</span>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">关于我们</p>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Kernel Patch Studio</h1>
          </div>
        </div>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          一款现代化的内核补丁工具前端界面，面向 Android 内核开发者和发烧友。
          提供简洁直观的操作面板，支持 boot.img 上传、KPM 内核模块管理、事件编排与补丁执行模拟。
        </p>
      </div>
    </div>

    <!-- Feature Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="feature in features" :key="feature.title" class="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/60">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg" :class="feature.iconBg">
          <span class="text-lg" v-html="feature.icon" />
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ feature.desc }}</p>
      </div>
    </div>

    <!-- Team / Contact -->
    <div class="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
      <h2 class="text-base font-semibold text-slate-900 dark:text-white">联系我们</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        有任何问题或建议，欢迎通过以下方式联系我们。我们致力于为开发者社区提供更好的内核开发工具。
      </p>
      <div class="mt-4 flex flex-wrap gap-4 text-sm">
        <a href="#" class="inline-flex items-center gap-2 text-sky-600 hover:text-sky-500 dark:text-sky-400">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
        <a href="#" class="inline-flex items-center gap-2 text-sky-600 hover:text-sky-500 dark:text-sky-400">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          kernel@patcher.dev
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'boot.img 上传',
    desc: '拖拽或点击上传内核 / boot.img 映像文件，支持 .img、.boot、.elf 格式。',
    icon: '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>',
    iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
  },
  {
    title: 'KPM 模块管理',
    desc: '上传多个 .kpm 模块，自动解析元数据，支持启用/禁用、拖拽排序。',
    icon: '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>',
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
  },
  {
    title: '事件编排',
    desc: '每个模块独立配置 Event 触发时机（pre-kernel-init 等）和运行参数。',
    icon: '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>',
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  },
  {
    title: '控制台日志',
    desc: '仿终端风格控制台，带时间戳和日志级别（INFO/SUCCESS/WARN/ERROR）。',
    icon: '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>',
    iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400',
  },
  {
    title: '暗色模式',
    desc: '跟随系统偏好或手动切换，保护视力，提升夜间使用体验。',
    icon: '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>',
    iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
  },
  {
    title: '响应式设计',
    desc: '完美适配手机端和桌面端，随时随地管理你的内核补丁。',
    icon: '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>',
    iconBg: 'bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400',
  },
]
</script>
