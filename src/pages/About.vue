<template>
  <div class="space-y-6">
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm dark:border-slate-800/70 dark:from-slate-950 dark:to-slate-900/80 sm:p-8">
      <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/10 blur-3xl dark:from-sky-500/15 dark:to-indigo-500/15" />
      <div class="relative">
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 100 100">
              <text x="50" y="80" font-family="Arial" font-size="80" text-anchor="middle">⭕</text>
              <text x="50" y="65" font-family="Arial" font-size="60" text-anchor="middle">💰</text>
            </svg>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">关于我们</p>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">CircleCashTeam</h1>
            <p class="mt-0.5 text-xs text-slate-400">I ♥️ CircleCash</p>
          </div>
        </div>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          <strong class="text-slate-900 dark:text-white">CircleCashTeam</strong> 是一支专注于 ⭕💰 的兴趣小组。
          我们相信自由软件与开放协作的力量，致力于为开发者社区提供高效、可靠的工具。
        </p>
      </div>
    </div>

    <!-- Contact -->
    <div class="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
      <h2 class="text-base font-semibold text-slate-900 dark:text-white">加入我们</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        CircleCashTeam 欢迎每一位热爱内核开发的伙伴。如有问题、建议或合作意向，欢迎通过以下方式联系。
      </p>
      <div class="mt-4 flex flex-wrap gap-4 text-sm">
        <a href="https://github.com/CircleCashTeam" target="_blank" class="inline-flex items-center gap-2 text-sky-600 hover:text-sky-500 dark:text-sky-400">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub / CircleCashTeam
        </a>
        <span class="inline-flex items-center gap-2 text-slate-400">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          affggh2333@gmail.com
        </span>
        <span class="inline-flex items-center gap-2 text-slate-400">
          <span>🐧</span>
          <a href="https://qm.qq.com/q/OpJrhIPogW" target="_blank" class="text-sky-600 hover:text-sky-500 dark:text-sky-400">893707858</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
