import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface LogEntry {
  id: string
  text: string
  type: 'info' | 'success' | 'error' | 'warning' | 'system'
  timestamp: string
}

export const useTerminalStore = defineStore('terminal', () => {
  const logs = ref<LogEntry[]>([])

  function appendLog(text: string, type: LogEntry['type'] = 'info') {
    const now = new Date()
    const timestamp = now.toLocaleTimeString('zh-CN', { hour12: false })
    logs.value.push({ id: crypto.randomUUID(), text, type, timestamp })
  }

  function clearLogs() {
    logs.value = []
  }

  return { logs, appendLog, clearLogs }
})
