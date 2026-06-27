import 'vue'
declare module 'vue' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}
export {}