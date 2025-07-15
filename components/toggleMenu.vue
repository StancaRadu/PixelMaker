<template>
    <div class="toggle-menu">
        <slot></slot>   
    </div>
</template>

<style scoped>
.toggle-menu {
    position: absolute;

    width: fit-content;
    height: fit-content;
    border: 2px solid var(--shadow-brown);
    box-shadow: 12px 12px 4px -4px var(--shadow-brown),
                inset 0 0 0 2px var(--off-white);
    background-color: var(--pastel-cream);

    z-index: 100;
}
</style>