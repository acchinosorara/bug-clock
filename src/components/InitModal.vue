<script setup lang="ts">
import { motion, AnimatePresence, easeOut } from 'motion-v'
import Warning from '~icons/my-icons/warning'
import Arw from '~icons/my-icons/arw'
import type { ComponentPublicInstance } from 'vue'

const { duration } = useAnimationValStore()
const { isInitModal } = storeToRefs(useViewStore())
const { randomInt } = random()
const modal = useTemplateRef<ComponentPublicInstance>('initModal')
const modalElement = computed<HTMLDialogElement | null>(
    () => (modal.value?.$el as HTMLDialogElement) ?? null
)

// 初回のみモーダルを表示
const isFirst = useSessionStorage('isFirst', true)
onBeforeMount(() => {
    if (isFirst.value) isInitModal.value = true
})
onMounted(() => {
    if (isFirst.value) {
        modalElement.value?.showModal()
    }
})

const hideModal = (): void => {
    modalElement.value?.classList.add('close')
    isInitModal.value = false
    isFirst.value = false
}

const isReferrer = window.history.length > 1 && document.referrer !== ''
const router = useRouter()
const back = (): void => {
    router.back()
}

// 文字化け
const heading = ['注', '意']
const setHeading = (): string => {
    const text = ref<string[]>(heading)
    const length = heading.length
    const point = randomInt({ min: 0, max: length + 1 })
    switch (point) {
        case 0:
            text.value = ['ﾁ', ...heading]
            break
        case length:
            text.value = [...heading, 'ｲ']
            break
        default:
            const kana = isTrigger(2) ? 'ﾁ' : 'ｲ'
            text.value.splice(1, 0, kana)
    }
    return text.value.join('')
}

const { bgClassNames } = setCommonClass()
const { colorsIndex, colorIndex } = storeToRefs(useColorsIndexStore())
const viewColorClass = computed<string>(
    () => bgClassNames[colorsIndex.value]?.[colorIndex.value] ?? ''
)
</script>

<template>
    <AnimatePresence>
        <motion.dialog
            v-if="isInitModal"
            ref="initModal"
            class="modal"
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{
                opacity: 0,
                scale: 1,
                transition: { duration: duration, ease: easeOut, delay: 0 }
            }"
            :transition="{
                duration: duration,
                ease: easeOut,
                delay: duration
            }"
            @cancel.prevent="hideModal()"
            @close="hideModal()"
        >
            <div class="modal-inner">
                <h2 class="modal-h">
                    <Warning />
                    <p>{{ setHeading() }}</p>
                </h2>
                <p class="modal-desc">
                    当サイトは、バグった時計が表示されます。<br />
                    バグが苦手な方、体調の優れない方は、<br />
                    閲覧を控えることをおすすめします。
                </p>
                <button @click="hideModal()" :class="viewColorClass" class="modal-btn view">
                    <span>閲覧する</span>
                    <span class="modal-btn-ic">
                        <Arw />
                    </span>
                </button>
                <button v-if="isReferrer" @click="back" class="modal-btn back">
                    <span>やめる</span>
                </button>
            </div>
        </motion.dialog>
    </AnimatePresence>
</template>

<style lang="scss" scoped>
.modal {
    position: fixed;
    width: min(100% - $inline * 2, 480px);
    color: $light;
    font-size: 1rem;
    background-color: $dark200;
    border: solid 1px $dark400;
    border-radius: 8px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &::backdrop {
        background-color: $dark100;
        opacity: 0.5;
        transition: opacity $duration ease-out $delay;

        @starting-style {
            opacity: 0;
        }
    }

    &.close::backdrop {
        opacity: 0;
        transition-delay: 0s;
    }

    &-inner {
        @include flex-center;
        width: calc(100% - $inline * 2);
        margin-inline: auto;
        padding: calc($inline * 2) calc($inline / 2);
        flex-direction: column;
    }

    &-h {
        @include flex-center;
        gap: 0.25em;
        font-size: 1.75em;
        margin-bottom: 0.75em;
        margin-left: -1.25em;

        svg {
            width: 1.25em;
            height: auto;
        }

        p {
            font-weight: bold;
        }
    }

    &-desc {
        margin-bottom: 2em;
    }

    &-btn {
        @include flex-center;
        position: relative;
        width: 100%;
        height: 3.5em;
        padding-inline: 1.5em;
        border-radius: 3.5em;

        &.view {
            color: $dark200;
            font-weight: bold;
            background-color: $light;
            transition: color $duration ease-out;

            &.bg {
                @each $name, $value in $colors {
                    &-#{$name} {
                        @include hover {
                            color: $value;

                            .modal-btn-ic::before {
                                scale: 1.3;
                                background-color: $value;
                            }
                        }
                    }
                }
            }
        }

        &.back {
            color: $light300;
            background-color: $dark300;
            margin-top: 0.5em;
            transition: color $duration ease-out;

            @include hover {
                color: $light;
            }
        }

        &-ic {
            @include flex-center;
            position: absolute;
            height: calc(100% - 1.5em);
            aspect-ratio: 1 / 1;
            color: $light;
            top: 50%;
            right: 0.75em;
            translate: 0 -50%;

            &::before {
                @include center;
                @include circle;
                content: '';
                width: 100%;
                background-color: $dark200;
                z-index: -1;
                transition: all $duration ease-out;
            }

            svg {
                width: 0.6em;
                height: auto;
            }
        }
    }
}
</style>
