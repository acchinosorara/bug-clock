<script setup lang="ts">
import { setColorClass } from '@/utils/setColorClass'
import type { CSSProperties } from 'vue'

const { clockSizeSub } = storeToRefs(useClockSizeStore())
const { randomInt, randomDeci } = random()

const noiseMin = 5
const noiseMax = 40
const noiseIndex = ref<number>(0)

// ノイズ総数分の乱数を生成
const setVal = (minVal: number, maxVal: number): number[] => {
  return setArray(
    noiseIndex.value,
    () => randomInt({ min: minVal, max: maxVal })
  )
}

// ノイズ総数分のbgClassNamesインデックス番号
const { bgClassNames } = setColorClass()
const bgLength = bgClassNames.length
const bgClassNamesIndex = ref<number[]>([])

// ノイズ総数分のCSS値
const widthMax = clockSizeSub.value / 10
const width = ref<number[]>([])
const height = ref<number[]>([])
const opacity = ref<number[]>([])
const translateMax = clockSizeSub.value / 1.75
const translateX = ref<string[]>([])
const translateY = ref<string[]>([])

let interval: number
const animation = (): void => {
  interval = setInterval(() => {

    // 1/4の確率でノイズが走る
    noiseIndex.value = isTrigger(4) ? randomInt({min: noiseMin, max: noiseMax}) : 0

    if (noiseIndex.value < 1) return
    bgClassNamesIndex.value = setVal(0, bgLength)

    // 横長にする
    width.value = setVal(4, widthMax)
    height.value = width.value.map(w => randomInt({min: 1, max: w / 3}))

    opacity.value = setArray(noiseIndex.value, () => randomDeci({min: 0.6, max: 1}))

    translateX.value = setArray(noiseIndex.value, () => `${setPlusMinus()} ${randomInt({min: 0, max: translateMax})}`)
    translateY.value = setArray(noiseIndex.value, () => `${setPlusMinus()} ${randomInt({min: 0, max: translateMax})}`)
  }, 100)
}

onMounted(animation)
onUnmounted(() => clearInterval(interval))

const setStyle = (i: number): CSSProperties => {
  return {
    'width': `${width.value[i]}px`,
    'height': `${height.value[i]}px`,
    'opacity': `${opacity.value[i]}`,
    'translate': `calc(-50% ${translateX.value[i]}px) calc(-50% ${translateY.value[i]}px)`
  }
}
</script>

<template>
  <span
    v-for="(_, i) in noiseIndex" :key="i"
    :style="setStyle(i)"
    :class="bgClassNames[bgClassNamesIndex[i] ?? randomInt({min: 0, max: bgLength})]" class="noise">
  </span>
</template>

<style lang="scss" scoped>
.noise {
  position: absolute;
  mix-blend-mode: difference;
  top: 50%;
  left: 50%;

  &.bg {
    &-orange {
        background-color: $orange;
    }
    &-blue {
        background-color: $blue;
    }
    &-white {
        background-color: $light;
    }
  }
}
</style>
