<script setup lang="ts">
import { useStrongEffect } from '@/composables/strongEffect'
import { useUpdateInterval } from '@/composables/updateInterval'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'
import type { CSSProperties } from 'vue'

const { countMax } = useAnimationValStore()
const { randomInt } = random()
const { width: windowWidth, height: windowHeight } = useWindowSize()

const count = ref<number>(0)
const isClone = ref<boolean>(false)
const hands = useTemplateRef('hands')

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

const setTranslate = (): void => {
    ;(Object.keys(translate.value) as (keyof Translate)[]).forEach((key) => {
        translate.value[key].operator = setPlusMinus()
        translate.value[key].val = randomInt({ min: 2, max: 10 })
    })
}

// 画面外に達したか判定
const isOverflow = (): boolean => {
    const el = hands.value?.at(-1)
    if (!el) return false

    const { left, top, width, height } = el.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    return x < 0 || x > windowWidth.value || y < 0 || y > windowHeight.value
}

// 色を指定
const { colorsIndex } = storeToRefs(useColorsIndexStore())
const { bgClassNames } = setCommonClass()
const bgClasses = computed(() => bgClassNames[colorsIndex.value] ?? [])

const colorIndexes = ref<number[]>([])
const addColorIndex = (): void => {
    colorIndexes.value.push(randomInt({ min: 0, max: bgClasses.value.length }))
}

const setClass = (i: number): string => {
    return bgClasses.value[colorIndexes.value[i] ?? 0] ?? ''
}

// 複製処理
const { isActive, endEffect } = useStrongEffect('cloneHands')

// エフェクト終了で複製体を削除
const resetClone = (): void => {
    count.value = 0
    colorIndexes.value = []
    isClone.value = false
}
watch(isActive, (val) => {
    if (!val) resetClone()
})

useUpdateInterval({
    delay: 250,
    countMax,
    tick: () => {
        if (!isActive.value) return

        // 複製開始
        if (!isClone.value) {
            isClone.value = true
            colorIndexes.value = []
            setTranslate()
            return
        }

        // 複製終了
        if (isOverflow()) {
            resetClone()
            endEffect()
            return
        }
        addColorIndex()
        count.value++
    }
})

// styleを出力
const setStyle = (i: number): CSSProperties => {
    const index = i + 1
    const { x, y, operatorX, operatorY } = translateState.value
    return {
        translate: `${operatorX}${index * x}% ${operatorY}${index * y}%`
    }
}

// 複製開始時の角度を保持
const { now } = storeToRefs(useNowStore())
const hourStyle = computed<CSSProperties>(() => {
    return {
        rotate: `${(now.value.getHours() % 12) * 30}deg`
    }
})
const minuteStyle = computed<CSSProperties>(() => {
    return {
        rotate: `${now.value.getMinutes() * 6}deg`
    }
})
</script>

<template>
    <div v-if="isClone" class="clone-hands">
        <div
            v-for="(_, i) in count"
            :key="i"
            ref="hands"
            :style="setStyle(i)"
            class="clone-hands-item"
        >
            <span class="hour" :class="setClass(i)" :style="hourStyle"></span>
            <span class="minute" :class="setClass(i)" :style="minuteStyle"></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.clone-hands {
    width: 100%;
    height: 100%;

    &-item {
        position: absolute;
        inset: 0;
    }
}

.hour {
    @include hand($border-extrabold, 0);
    height: 25%;
    background-color: $light;

    @include hand-inner;

    &.bg {
        @include bg-colors;
    }
}

.minute {
    @include hand($border-extrabold, 0);
    height: calc(50% - $scale-height - $border-semibold);
    background-color: $light;

    @include hand-inner;

    &.bg {
        @include bg-colors;
    }
}
</style>
