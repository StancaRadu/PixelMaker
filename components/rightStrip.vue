<template>
    <div id="rightStrip" class="standard-border">
        <div class="tool-area"></div>
    </div>
</template>

<style scoped>
#rightStrip {
    grid-area: rightStrip;
    width: 100%;
    height: 100%;
    box-shadow: inset 2px -2px 0px 0px var(--muted-gray),
        inset 0 2px 0px 0px var(--muted-gray);
    border-width: 2px 0 2px 2px;
    background-color: var(--warm-beige);
}

.tool-area {
    width: 100%;
    height: 100%;
}
</style>