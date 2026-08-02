<script setup lang="ts">
import PopProgress from './PopProgress.vue'
import { useMakeButtonStore } from '@/stores/onetime/makeButton'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { useOnetimePatternStore } from '@/stores/onetime/onetimePattern'
import { useMakeOnetime } from '@/composables/makeOnetime'
import { onetimeReverse } from '@/utils/onetime/reverse'
import { onetimeMultiple } from '@/utils/onetime/multiple'
import { onetimeClass } from '@/utils/onetime/onetimeClass'
import type { ClassState } from '@/types/ClassState'
import type { CSSProperties } from 'vue'

const { pattern } = useOnetimePatternStore()
const { currentPattern, characters, origin } = useMakeOnetime()
const onetimePopStore = useOnetimePopStore()
const { isPopover, charSize } = storeToRefs(onetimePopStore)
const { makeButton } = storeToRefs(useMakeButtonStore())

const newCharacters = ref<string[]>([])
const onetimeClassStates = ref<ClassState[]>([])
const onetimeStyleStates = ref<CSSProperties[]>([])

watch(isPopover, async (val) => {
    newCharacters.value = []
    onetimeClassStates.value = []
    onetimeStyleStates.value = []

    if (val) {
        await nextTick()
        if (pop.value) {
            charSize.value = parseFloat(getComputedStyle(pop.value).fontSize)
        }

        switch (currentPattern.value) {
            case pattern[0]:
                newCharacters.value = onetimeReverse(characters.value)
                break
            case pattern[1]:
                const { multipleCharacters, multipleMargin } = onetimeMultiple(characters.value)
                newCharacters.value = multipleCharacters
                onetimeStyleStates.value = multipleMargin() ?? []
                break
            default:
                newCharacters.value = characters.value
        }

        onetimeClassStates.value = onetimeClass(newCharacters.value, currentPattern.value)
    }
})

const setStyle = (i: number): CSSProperties | undefined => {
    return onetimeStyleStates.value[i]
}

const pop = useTemplateRef('pop')
onMounted(() => {
    onClickOutside(pop, () => (isPopover.value = false), {
        ignore: [makeButton]
    })
})
</script>

<template>
    <div v-if="isPopover" ref="pop" class="popover">
        <time :datetime="origin" class="popover-today">
            <span
                v-for="(char, i) in newCharacters"
                :key="char"
                :class="onetimeClassStates[i]"
                class="popover-today-char"
                :style="setStyle(i)"
            >
                {{ char }}
            </span>
        </time>
        <PopProgress />
    </div>
</template>

<style lang="scss" scoped>
.popover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    color: $light;
    font-size: 0.5rem;
    width: 10em;
    height: 4em;
    background-color: $dark200;
    padding-inline: calc($side * 2);
    border: solid 1px $dark300;
    border-radius: 4px;
    top: -0.5em;
    right: $side;
    translate: 0 -100%;

    &-today {
        display: flex;
        align-items: center;
        white-space: nowrap;

        &-char {
            @include invert;
        }
    }
}
</style>
