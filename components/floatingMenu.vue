<template>
    <div class="floating-menu">
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    visible: Boolean
})
</script>

<style scoped>
.floating-menu {
    position: fixed;

    width: fit-content;
    min-width: 200px;
    height: fit-content;
    min-height: 200px;
    border: 2px solid var(--shadow-brown);
    box-shadow: 12px 12px 4px -4px var(--shadow-brown),
                inset 0 0 0 2px var(--off-white);
    background-color: var(--pastel-cream);

    z-index: 100;

    transform: translate(-50%, -50%);

    top: 50%;
    left: 50%;
}
</style>