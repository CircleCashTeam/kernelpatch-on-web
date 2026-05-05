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
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">v{{ version }}</h1>
            <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">构建日期: 2026-05-05</p>
          </div>
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
      <h2 class="text-base font-semibold text-slate-900 dark:text-white">更新日志</h2>
      <div class="mt-4 space-y-4">
        <div v-for="log in changelog" :key="log.version" class="border-l-2 border-sky-200 pl-4 dark:border-sky-800">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-sky-600 dark:text-sky-400">v{{ log.version }}</span>
            <span class="text-xs text-slate-400">{{ log.date }}</span>
          </div>
          <ul class="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600 dark:text-slate-400">
            <li v-for="item in log.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Note -->
    <div class="rounded-xl border border-amber-200/70 bg-amber-50/80 p-4 text-sm text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/40 dark:text-amber-300">
      <div class="flex items-start gap-3">
        <svg class="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <span>该版本为前端原型版本，目前使用模拟补丁流程。后续可接入实际后端 API，实现真正的内核 / boot.img 补丁能力。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const version = '0.1.0'

const techStack = [
  { label: 'UI 框架', value: 'Vue 3 + Vite 8' },
  { label: '状态管理', value: 'Pinia 3' },
  { label: '路由', value: 'Vue Router 4' },
  { label: '样式方案', value: 'Tailwind CSS 3' },
  { label: '语言', value: 'TypeScript 6' },
  { label: '构建工具', value: 'Vite 8' },
]

const changelog = [
  {
    version: '0.1.0',
    date: '2026-05-05',
    items: [
      '完整的 boot.img / 内核映像上传功能，支持拖拽',
      'KPM 模块批量上传，自动解析 ELF 元数据',
      '模块事件 Event 选择器（8 种触发时机）',
      '模块运行参数 Param 配置',
      '仿终端控制台，支持多级别彩色日志',
      '响应式布局，完美适配手机端和桌面端',
      '系统暗色模式支持，可手动切换',
      '模块启用/禁用、统计看板、补丁模拟执行',
      '关于我们页面与技术栈展示',
    ],
  },
]
</script>
