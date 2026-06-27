<script setup lang="ts">
import Hour from '@/components/hands/HandHour.vue'
import Minute from '@/components/hands/HandMinute.vue'
import Second from '@/components/hands/HandSecond.vue'
</script>

<template>
    <div class="clock-hands">
        <span class="clock-hands-support"></span>
        <Hour />
        <Minute />
        <Second />
    </div>
</template>

<style lang="scss" scoped>
.clock-hands {
    @include center;
    width: 100%;
    height: 100%;
    rotate: 180deg;

    &-support {
        @include center;
        @include circle;
        width: calc($border-extrabold * 1.75);
        background-color: $light;
        z-index: 10;

        &::before {
            @include center;
            @include circle;
            content: "";
            width: calc(100% - $border-medium);
            background-color: $dark;
        }
    }
}
</style>