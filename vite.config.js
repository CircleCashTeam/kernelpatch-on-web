import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        // 让每个插件都打包成独立的文件
                        return id.toString().split("node_modules/")[1].split("/")[0].toString();
                    }
                }
            }
        }
    }
})