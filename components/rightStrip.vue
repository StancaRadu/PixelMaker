<template>
    <div id="rightStrip" class="standard-border">
        <div class="tool-area"></div>
    </div>
</template>

<style scoped>
#rightStrip {
    grid-area: rightStrip;
    width: fit-content;
    height: 100%;
    box-shadow: inset 2px -2px 0px 0px var(--muted-gray),
        inset 0 2px 0px 0px var(--muted-gray);
    border-width: 2px 0 2px 2px;
    padding: 6px 4px 6px 6px;
    background-color: var(--warm-beige);
}

.tool-area {
    width: 2lh;
    height: 100%;
}
</style>