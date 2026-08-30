<script setup lang="ts">
import { motion, AnimatePresence, easeOut } from 'motion-v'
import CopyButton from './CopyButton.vue'
import PopProgress from './PopProgress.vue'
import { useMakeButtonStore } from '@/stores/onetime/makeButton'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { useOnetimePatternStore } from '@/stores/onetime/onetimePattern'
import { useMakeOnetime } from '@/composables/makeOnetime'
import { onetimeReverse } from '@/utils/onetime/reverse'
import { onetimeMultiple } from '@/utils/onetime/multiple'
import { onetimeSlash } from '@/utils/onetime/slash.ts'
import { onetimeTag } from '@/utils/onetime/tag.ts'
import { onetimeError } from '@/utils/onetime/error.ts'
import { onetimeClass } from '@/utils/onetime/onetimeClass'
import type { ClassState } from '@/types/ClassState'
import type { CSSProperties, ComponentPublicInstance } from 'vue'
import type { VariantType, Transition } from 'motion-v'

const { duration } = useAnimationValStore()
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

const pop = useTemplateRef<ComponentPublicInstance>('pop')
const popElement = computed<HTMLElement | null>(() => (pop.value?.$el as HTMLElement) ?? null)

watch(isPopover, async (val) => {
    if (val) {
        isCopied.value = false
        newCharacters.value = []
        timeStyleState.value = {}
        charClassStates.value = []
        charStyleStates.value = []
        animateStates.value = []
        transitionState.value = {}
        isEffectIndex.value = []

        await nextTick()
        if (pop.value) {
            charSize.value = parseFloat(getComputedStyle(popElement.value as HTMLElement).fontSize)
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

            // タグの誤表示
            case pattern[3]:
                newCharacters.value = onetimeTag(characters.value)
                timeStyleState.value = {
                    justifyContent: 'flex-end'
                }
                break

            // エラー
            case pattern[4]:
                newCharacters.value = onetimeError()
                break

            // 通常
            default:
                newCharacters.value = characters.value
        }

        charClassStates.value = onetimeClass(newCharacters.value, currentPattern.value)
    }
})

onMounted(() => {
    onClickOutside(popElement, () => (isPopover.value = false), {
        ignore: [makeButton]
    })
})
</script>

<template>
    <AnimatePresence>
        <motion.div
            v-if="isPopover"
            ref="pop"
            class="pop mono"
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 1 }"
            :transition="{ duration: duration, ease: easeOut }"
        >
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
        </motion.div>
    </AnimatePresence>
</template>

<style lang="scss" scoped>
.pop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    color: $light;
    font-size: 1.25rem;
    width: 11em;
    height: 5em;
    background-color: $dark200;
    padding: 0 1.5em 4px;
    border: solid 1px $dark400;
    border-radius: 4px;
    bottom: calc($make-button-size + $block);
    right: $inline;
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
