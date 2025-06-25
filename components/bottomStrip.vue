<template>
    <div id="bottomStrip" class="standard-border">
        <div class="tool-area"></div>
    </div>
</template>

<style scoped>
#bottomStrip {
    grid-area: bottomStrip;
    width: 100%;
    height: 100%;
    box-shadow: inset 2px 2px 0px 0px var(--muted-gray);
    border-width: 2px 0 0 2px;
    background-color: var(--warm-beige);
}

.tool-area {
    width: 100%;
    height: 100%;
}
</style>