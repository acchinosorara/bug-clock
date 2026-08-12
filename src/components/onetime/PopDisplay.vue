<script setup lang="ts">
import { motion } from 'motion-v'
import CopyButton from './CopyButton.vue'
import PopProgress from './PopProgress.vue'
import { useMakeButtonStore } from '@/stores/onetime/makeButton'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { useOnetimePatternStore } from '@/stores/onetime/onetimePattern'
import { useMakeOnetime } from '@/composables/makeOnetime'
import { onetimeReverse } from '@/utils/onetime/reverse'
import { onetimeMultiple } from '@/utils/onetime/multiple'
import { onetimeSlash } from '@/utils/onetime/slash.ts'
import { onetimeClass } from '@/utils/onetime/onetimeClass'
import type { ClassState } from '@/types/ClassState'
import type { CSSProperties } from 'vue'
import type { VariantType, Transition } from 'motion-v'

const onetimePatternStore = useOnetimePatternStore()
const { pattern } = onetimePatternStore
const { isEffectIndex } = storeToRefs(onetimePatternStore)
const { currentPattern, characters, origin } = useMakeOnetime()
const onetimePopStore = useOnetimePopStore()
const { isPopover, isCopied, charSize } = storeToRefs(onetimePopStore)
const { makeButton } = storeToRefs(useMakeButtonStore())

const newCharacters = ref<string[]>([])
const timeStyleState = ref<CSSProperties>({})
const charClassStates = ref<ClassState[]>([])
const charStyleStates = ref<(CSSProperties | undefined)[]>([])
const animateStates = ref<(VariantType | undefined)[]>([])
const transitionState = ref<Transition>({})

watch(isPopover, async (val) => {
    newCharacters.value = []
    timeStyleState.value = {}
    charClassStates.value = []
    charStyleStates.value = []
    animateStates.value = []
    transitionState.value = {}
    isEffectIndex.value = []

    if (val) {
        await nextTick()
        if (pop.value) {
            charSize.value = parseFloat(getComputedStyle(pop.value).fontSize)
        }

        switch (currentPattern.value) {
            // 反転
            case pattern[0]:
                newCharacters.value = onetimeReverse(characters.value)
                break

            // 大量生成
            case pattern[1]:
                timeStyleState.value = {
                    justifyContent: 'flex-end'
                }
                const { multipleCharacters, multipleMargin } = onetimeMultiple(characters.value)
                newCharacters.value = multipleCharacters
                charStyleStates.value = multipleMargin() ?? []
                break

            // スラッシュ
            case pattern[2]:
                const {
                    slashRemoveCharacters,
                    isSlashIndex,
                    slashHeight,
                    slashAnimate,
                    slashTransition
                } = onetimeSlash(characters.value)
                newCharacters.value = slashRemoveCharacters
                isEffectIndex.value = isSlashIndex
                charStyleStates.value = slashHeight()
                animateStates.value = slashAnimate()
                transitionState.value = slashTransition()
                break

            // 通常
            default:
                newCharacters.value = characters.value
        }

        charClassStates.value = onetimeClass(newCharacters.value, currentPattern.value)
    }
})

const pop = useTemplateRef('pop')
onMounted(() => {
    onClickOutside(pop, () => (isPopover.value = false), {
        ignore: [makeButton]
    })
})
</script>

<template>
    <div v-if="isPopover" ref="pop" class="pop">
        <time :datetime="origin" class="pop-today" :style="timeStyleState">
            <motion.span
                v-show="!isCopied"
                v-for="(char, i) in newCharacters"
                :key="char"
                :class="charClassStates[i]"
                class="pop-today-char"
                :style="charStyleStates[i]"
                :animate="animateStates[i]"
                :transition="transitionState"
            >
                {{ char }}
            </motion.span>
            <CopyButton />
        </time>
        <PopProgress />
    </div>
</template>

<style lang="scss" scoped>
.pop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    color: $light;
    font-size: 0.5rem;
    width: 12em;
    height: 4em;
    background-color: $dark200;
    padding: 0 calc($side * 2) 4px;
    border: solid 1px $dark400;
    border-radius: 4px;
    bottom: calc($make-button-size + $border-extrabold);
    right: $side;
    translate: 0 -8px;

    &-today {
        @include flex-center;
        position: relative;
        white-space: nowrap;
        padding-right: calc(1.25em + 8px);
        z-index: 10;

        &-char {
            @include invert;

            &.slash {
                position: relative;
                padding-right: 0.5em;

                &::after {
                    content: '';
                    position: absolute;
                    width: 2px;
                    height: 100%;
                    background-color: $light;
                    rotate: 25deg;
                    top: 50%;
                    right: 0.25em;
                    translate: 50% -50%;
                }
            }
        }
    }
}
</style>
