<template>
    <div class="plus-graphic">
        <div id="vertical-line"></div>
        <div id="horizontal-line"></div>
    </div>
</template>

<style scoped>  
.plus-graphic {
    position: relative;
    width: 100%;
    height: 100%;
}
#vertical-line, #horizontal-line {
    position: absolute;
    background-color: var(--shadow-brown);
}
#vertical-line {
    width: 2px;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
}
#horizontal-line {
    height: 2px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
</style>