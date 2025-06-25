<template>
    <div class="tool-bg">
        <slot></slot>
    </div>
</template>

<style scoped>
.tool-bg {
    position: relative;

    width: 100%;
    max-width: 100%;
    height: fit-content;
    /* box-shadow: inset -2px 2px 0 0px var(--pastel-cream), 
                inset 1px -1px 1px 0px var(--shadow-brown); */

    box-shadow: inset 0 0 2px 2px var(--shadow-brown);
    border: 2px solid var(--pastel-cream);
    padding: 6px;

    display: flex;

    background-color: var(--muted-gray);
}
</style>