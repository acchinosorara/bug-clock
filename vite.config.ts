import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Unfonts from 'unplugin-fonts/vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: true,
        port: 3000
    },
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
            dirs: ['./src/utils', './src/stores'],
            dts: 'auto-imports.d.ts'
        }),
        Unfonts({
            google: {
                families: ['Noto Sans JP', 'Google Sans Code']
            }
        }),
        Icons({
            compiler: 'vue3',
            customCollections: {
                'my-icons': FileSystemIconLoader('./src/assets/icons')
            }
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/assets/scss/_var.scss" as *; \
                    @use "@/assets/scss/_mixin.scss" as *;
                `
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
