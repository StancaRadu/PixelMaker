<template>
    <div id="topStrip" class="standard-border">
        <div class="tool-area"></div>
    </div>
</template>

<style scoped>
#topStrip {
    grid-area: topStrip;
    width: 100%;
    height: fit-content;
    box-shadow: inset 0 -2px 0px 0px var(--muted-gray);
    border-width: 0 0 2px 0;
    background-color: var(--warm-beige);
}

.tool-area {
    width: 100%;
    height: 2lh;
}
</style>