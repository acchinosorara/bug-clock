<script setup lang="ts">
import { useStrongEffect } from '@/composables/strongEffect'
import { useUpdateInterval } from '@/composables/updateInterval'
import type { CSSProperties } from 'vue'

const { width, height } = useWindowSize()
const { countMax } = useAnimationValStore()
const { randomInt } = random()

const noiseMin = 10
const noiseMax = 40
const noiseIndex = ref<number>(0)
const count = ref<number>(0)

// ノイズ総数分の乱数を生成
const setVal = (minVal: number, maxVal: number): number[] => {
    return setArray(noiseIndex.value, () => randomInt({ min: minVal, max: maxVal }))
}

// ノイズ総数分の値をセット
const colors = ['dark', 'light']
const colorClasses = ref<string[]>([])

const noiseWidth = ref<number[]>([])
const noiseHeight = ref<number[]>([])
const maskImage = ref<string[]>([])
const translateX = ref<string[]>([])
const translateY = ref<string[]>([])

// 縞模様を入れる
const direction = [0, 45, 90, 135]
const setMaskImage = (): string => {
    const size = randomInt({ min: 2, max: 33 })
    const dirIndex = randomInt({ min: 0, max: direction.length })
    const dir = direction[dirIndex]
    const stripe = Array.from(
        { length: 2 },
        (_, i) => `rgba(0, 0, 0, ${i === 0 ? 1 : 0}) ${i * size}px ${(i + 1) * size}px`
    )
    const val = stripe.join(',')

    return `repeating-linear-gradient(${dir}deg, ${val})`
}

const { isActive, endEffect } = useStrongEffect('noiseLarge')

// エフェクト終了でノイズを削除
const resetNoise = (): void => {
    count.value = 0
    noiseIndex.value = 0
}
watch(isActive, (val) => {
    if (!val) resetNoise()
})

useUpdateInterval({
    delay: 1000,
    countMax,
    tick: () => {
        if (!isActive.value) return

        // ノイズ終了
        if (count.value >= 6) {
            resetNoise()
            endEffect()
            return
        }
        count.value++

        noiseIndex.value = randomInt({ min: noiseMin, max: noiseMax })

        colorClasses.value = setArray(noiseIndex.value, () => {
            const index = randomInt({ min: 0, max: colors.length })
            return colors[index]!
        })

        noiseWidth.value = setVal(width.value / 12, width.value / 1.5)
        noiseHeight.value = setVal(height.value / 12, height.value / 1.5)

        maskImage.value = setArray(noiseIndex.value, () =>
            isTrigger(8) ? setMaskImage() : 'initial'
        )

        translateX.value = setArray(
            noiseIndex.value,
            () => `${setPlusMinus()} ${randomInt({ min: 0, max: 100 })}`
        )

        translateY.value = setArray(
            noiseIndex.value,
            () => `${setPlusMinus()} ${randomInt({ min: 0, max: 200 })}`
        )
    }
})

const setStyle = (i: number): CSSProperties => {
    return {
        width: `${noiseWidth.value[i]}px`,
        height: `${noiseHeight.value[i]}px`,
        maskImage: `${maskImage.value[i]}`,
        WebkitMaskImage: `${maskImage.value[i]}`,
        translate: `calc(-50% ${translateX.value[i]}px) calc(-50% ${translateY.value[i]}%)`
    }
}
</script>

<template>
    <span
        v-for="(_, i) in noiseIndex"
        :key="i"
        :style="setStyle(i)"
        :class="colorClasses[i]"
        class="noise"
    >
    </span>
</template>

<style lang="scss" scoped>
.noise {
    position: absolute;
    mix-blend-mode: difference;
    top: 50%;
    left: 50%;

    &.dark {
        background-color: $dark100;
    }

    &.light {
        background-color: $light;
    }
}
</style>
