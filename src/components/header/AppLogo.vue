<script setup lang="ts">
import Logo from '~icons/my-icons/logo'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed<boolean>(() => route.path === '/')

const { clockKey } = storeToRefs(useViewStore())
const { colorsIndex } = storeToRefs(useColorsIndexStore())
const { setColorsIndex } = useColorsIndexStore()
const { colorClassNames } = setCommonClass()

const reload = (): void => {
    if (!isHome.value) return
    clockKey.value++
    setColorsIndex()
}

const setLogoClass = computed<string[]>(() => {
    return colorClassNames[colorsIndex.value] ?? []
})
</script>

<template>
    <RouterLink
        :to="{ name: 'home' }"
        @click="reload()"
        :aria-label="isHome ? '再読み込み' : 'ホームへ戻る'"
        class="logo"
    >
        <h1 class="logo-h">
            <span
                v-for="(className, i) in setLogoClass"
                :key="i"
                :class="className"
                class="logo-image"
            >
                <Logo />
            </span>
        </h1>
    </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
    &-h {
        position: relative;
    }

    &-image {
        display: flex;
        height: calc(var(--header-height) / 3);

        @include mq {
            height: calc(var(--header-height) / 3.5);
        }

        &:not(:last-child) {
            position: absolute;
            top: 0;
            left: 0;
        }

        &:nth-child(1) {
            translate: -2px 0;

            @include mq {
                translate: -1px 0;
            }
        }

        &:nth-child(2) {
            translate: 2px 0;

            @include mq {
                translate: 1px 0;
            }
        }

        &:last-child {
            position: relative;
        }

        &.color {
            @include text-colors;

            &-white {
                color: $light;
            }
        }

        svg {
            width: auto;
            height: 100%;
        }
    }
}
</style>
