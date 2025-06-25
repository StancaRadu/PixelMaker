<template>
    <div class="color-palette-box">
        <slot></slot>
    </div>
</template>

<style>
.color-palette-box {
    aspect-ratio: 1;
    width: 100%;
    border: 2px solid var(--shadow-brown);

    background-color: hsl(224, 8%, 72%);
}
</style>