<script setup lang="ts">
import GitHub from '~icons/my-icons/github'
import Hatenablog from '~icons/my-icons/hatenablog'

const socialAttr = {
    target: '_blank',
    rel: 'noopener noreferrer',
    class: 'list-social-link'
}
</script>

<template>
    <ul class="list">
        <li>
            <RouterLink to="/about" class="mono">ABOUT</RouterLink>
        </li>
        <li>
            <ul class="list-social">
                <li>
                    <a
                        href="https://github.com/acchinosorara/bug-clock"
                        v-bind="socialAttr"
                        aria-label="GitHub"
                    >
                        <GitHub />
                    </a>
                </li>
                <li>
                    <a
                        href="https://acchinosorara.hatenablog.jp/"
                        v-bind="socialAttr"
                        aria-label="はてなブログ"
                    >
                        <Hatenablog />
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.list {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;

    a {
        color: $light300;
        font-size: 0.8rem;
        font-weight: bold;
        letter-spacing: 0.075em;
        transition: color $duration;

        @include hover {
            color: $light200;
        }
    }

    &-social {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-left: 0.5rem;

        &-link {
            svg {
                display: flex;
                width: 1.75rem;
                height: auto;
            }
        }
    }
}
</style>
