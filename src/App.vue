<script setup lang="ts">
import { motion, AnimatePresence, easeOut } from 'motion-v'
import Header from '@/components/AppHeader.vue'
import Footer from '@/components/AppFooter.vue'
import type { ComponentPublicInstance } from 'vue'

const { viewDuration } = useAnimationValStore()
const { initBlur } = useViewStore()

const view = useTemplateRef<ComponentPublicInstance>('view')
const clearBlur = (): void => {
    const element = view.value?.$el as HTMLElement | undefined
    if (element) element.style.filter = ''
}
</script>

<template>
    <Header />
    <main>
        <RouterView v-slot="{ Component, route }">
            <AnimatePresence mode="wait">
                <motion.div
                    :key="route.path"
                    ref="view"
                    :initial="{ opacity: 0, filter: initBlur }"
                    :animate="{ opacity: 1, filter: 'blur(0px)' }"
                    :exit="{ opacity: 0, filter: initBlur }"
                    :transition="{ duration: viewDuration, ease: easeOut }"
                    :onAnimationComplete="clearBlur"
                >
                    <component :is="Component" />
                </motion.div>
            </AnimatePresence>
        </RouterView>
    </main>
    <Footer />
</template>
