<script setup lang="ts">
import { useStrongEffect } from '@/composables/strongEffect'
import { useUpdateInterval } from '@/composables/updateInterval'
import type { CSSProperties } from 'vue'

const { countMax } = useAnimationValStore()
const { randomInt, randomDeci } = random()
const { width: windowWidth, height: windowHeight } = useWindowSize()

const hour = 12
const setIndex = (i: number): number => (i === 0 ? 12 : i)

const isClone = ref<boolean>(false)
const cloneTarget = ref<number>(0)
const cloneRefs = useTemplateRef('cloneRef')

// タイマーのカウント
const childCount = ref<number>(0)

// 文字間隔を出力
const gap = ref<number>(0)
const setGap = (): void => {
    gap.value = randomDeci({ min: 1, max: 4 })
}

// translateの値を定義
type Translate = {
    x: {
        operator: string
        val: number
    }
    y: {
        operator: string
        val: number
    }
}
const translate = ref<Translate>({
    x: {
        operator: '',
        val: 0
    },
    y: {
        operator: '',
        val: 0
    }
})

// translateの値を自動更新
const translateState = computed(() => {
    const { x, y } = translate.value
    return {
        x: x.val,
        y: y.val,
        operatorX: x.operator,
        operatorY: y.operator
    }
})

// translateの値を出力
const setTranslate = (): void => {
    ;(Object.keys(translate.value) as (keyof Translate)[]).forEach((key) => {
        translate.value[key].operator = setPlusMinus()
        translate.value[key].val = randomInt({ min: 0, max: 50 })
    })
}

const isCharSize = ref<boolean>(false)
const halfWidth = ref<number>(0)
const halfHeight = ref<number>(0)

// 複製文字が画面外に達したか判定
const setOverflow = (pos: number, half: number, window: number): boolean => {
    const overMinus = pos < 0 - half
    const overPlus = pos > window - half
    return overMinus || overPlus
}

const isOverflow = (): boolean | void => {
    const el = cloneRefs.value?.at(-1)
    if (!el) return

    // 終了判定のため、一度だけ文字サイズを算出
    if (!isCharSize.value) {
        const { width, height } = useElementBounding(el)
        halfWidth.value = Math.round(width.value / 2)
        halfHeight.value = Math.round(height.value / 2)
        isCharSize.value = true
    }

    const { x, y } = useElementBounding(el)
    const overflowX = setOverflow(x.value, halfWidth.value, windowWidth.value)
    const overflowY = setOverflow(y.value, halfHeight.value, windowHeight.value)
    return overflowX || overflowY
}

// ランダムに点滅
const isBlinks = ref<boolean[]>([])
const blink = (): void => {
    blinkInterval.value = setInterval(() => {
        const blinkTarget = randomInt({ min: 0, max: childCount.value + 1 })
        isBlinks.value[blinkTarget] = isTrigger(2)
    }, 50)
}
watch(
    () => childCount.value,
    (len) => {
        isBlinks.value = Array(len).fill(false)
    },
    {
        immediate: true
    }
)

const blinkInterval = ref<number>()

// 複製処理
const { isActive, endEffect } = useStrongEffect('cloneIndex')
useUpdateInterval({
    delay: 250,
    countMax,
    tick: () => {
        if (!isActive.value) return

        // 複製開始
        if (!isClone.value) {
            isClone.value = true

            // 複製文字を1つ指定
            cloneTarget.value = setIndex(randomInt({ min: 0, max: hour }))
            setGap()
            setTranslate()
            isCharSize.value = false
            return
        }

        // 複製を重ねるごとに終了確率を上げる
        const probability = randomInt({ min: 0, max: 400 })

        // 複製終了
        if (probability < childCount.value || isOverflow()) {
            clearInterval(blinkInterval.value)
            childCount.value = 0
            isClone.value = false
            endEffect()
            return
        }
        childCount.value++
        blink()
    }
})

const { clockSizeSub } = storeToRefs(useClockSizeStore())
const scaleStore = useScaleHeightStore()
const { scaleHeightDefault } = scaleStore
const { scaleHeight } = storeToRefs(scaleStore)

// styleを出力
const parentStyle = (i: number): CSSProperties => {
    return {
        '--i': i,
        '--pos': `
            calc(${clockSizeSub.value / 2}px - 0.5em - ${Math.round(scaleHeight.value ?? scaleHeightDefault / 1.5)}px)
        `
    }
}
const childStyle = (i: number): CSSProperties => {
    const index = i + 1
    const { x, y, operatorX, operatorY } = translateState.value
    return {
        translate: `
            calc(-50% ${operatorX} ${index * gap.value * x}%)
            calc(-50% ${operatorY} ${index * gap.value * y}%)
        `
    }
}
</script>

<template>
    <div class="index">
        <div v-if="isClone" :style="parentStyle(cloneTarget)" class="index-text mono">
            <span
                v-for="(_, i) in childCount"
                :key="i"
                ref="cloneRef"
                :style="childStyle(i)"
                class="index-clone"
                :class="{ blink: isBlinks[i] }"
            >
                {{ cloneTarget }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.index {
    @include center;
    width: 100%;
    height: 100%;
    rotate: -90deg;

    &-text {
        @include circular(12);
        display: flex;
        color: $light;
        font-size: $index-size;
        font-weight: bold;
        line-height: 1;
        rotate: 90deg;
        transform-origin: center;
    }

    &-clone {
        position: absolute;

        &.blink {
            opacity: 0;
        }
    }
}
</style>
