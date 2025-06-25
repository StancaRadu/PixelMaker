<template>
    <div id="leftStrip" class="standard-border">
        <colorPalette />
        <colorPicker />
    </div>
</template>

<style scoped>
#leftStrip {
    grid-area: leftStrip;

    display: grid;
    grid-auto-flow: row;
    grid-template-rows: repeat(auto-fit, minmax(0, max-content));
    gap: 4px;
    align-content: space-between;

    width: 100%;
    height: 100%;
    min-height: fit-content;
    box-shadow: inset -2px 2px 0px 0px var(--muted-gray);
    border-width: 2px 2px 0 0;
    padding: 4px;

    background-color: var(--warm-beige);
}

.tool-area {
    width: 100%;
    height: 100%;
}
</style>