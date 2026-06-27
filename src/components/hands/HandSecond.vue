<template>
    <span class="second"></span>
</template>

<style lang="scss" scoped>
$hand-out: 0.8rem;

.second {
    @include hand($border-regular, $hand-out);
    height: calc(50% + $hand-out - $scale-height - $border-semibold);
    background-color: $light;
    animation: count 10s steps(60) infinite;
}

@keyframes count {
    to {
        rotate: 360deg;
    }
}
</style>