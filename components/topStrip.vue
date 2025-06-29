<template>
    <div id="topStrip" class="standard-border">
        <menuBar />
    </div>
</template>

<style scoped>
#topStrip {
    grid-area: topStrip;
    width: 100%;
    height: fit-content;
    box-shadow: inset 0 -2px 0px 0px var(--muted-gray);
    border-width: 0 0 2px 0;
    padding-bottom: 2px;
    background-color: var(--warm-beige);
}

</style>