<template>
    <div id="workAreaWrapper" class="standard-border" ref="scrollArea"
        @wheel="handleScroll"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="stopDragging"
        @mouseleave="stopDragging">
        <div id="workArea" ref="workArea">
            <div id="canvasWrapper" class="standard-border" ref="canvasWrapper">
                <div id="canvasStack" ref="canvasStack">
                    <canvas id="canvasBg" ref="canvasBg"
                        :width="prefs.canvasSettings.width"
                        :height="prefs.canvasSettings.height"></canvas>
                    <canvas id="canvas" ref="canvas"
                        :width="prefs.canvasSettings.width"
                        :height="prefs.canvasSettings.height"
                        @mouseover="handleMouseOnCanvas"></canvas>
                    <canvas id="canvasGrid" ref="canvasGrid"
                            :width="prefs.canvasSettings.width"
                            :height="prefs.canvasSettings.height"></canvas>
                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#workAreaWrapper {
    grid-area: main;
    position: relative;

    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0px 2px var(--muted-gray);
    border-width: 2px;
    background-color: var(--pastel-blue);

    overflow: auto;
}
#workArea {
    position: absolute;
    display: grid;
    justify-items: center;
    align-items: center;

    --zoom: 100;

    width: calc(1% * var(--zoom));
    height: calc(1% * var(--zoom));
}
#canvasWrapper {
    /* position: absolute; */

    display: flex;
    justify-content: center;
    align-items: center;
    
    width: calc(100% - 200px);
    height: calc(100% - 200px);
    /* background-color: var(--muted-gray); */
}
#canvasStack {
    /* background-color: tomato; */
    position: relative;
    z-index: 2;
    
    display: flex;

    box-sizing: content-box;
    width: fit-content;
    height: fit-content;
    border: 4px solid var(--shadow-brown);
}   
canvas {
    position: absolute;
    width: 100%;
    height: 100%;

    image-rendering: pixelated;

    /* background-color: green; */
    cursor: crosshair;

    pointer-events: none;
}
#canvasBg{
    background-color: var(--light-gray);
}
#canvas{
    pointer-events: all;
}
/* #canvasGrid{
} */
</style>

<script setup>
import draw from '~/composable/canvas/draw'
import drawGrid from '~/composable/canvas/drawGrid'
import drawBackground from '~/composable/canvas/drawBackground'

const prefs = activeSettings();

const workArea = ref(null)
const scrollArea = ref(null)
const canvasStack = ref(null)
const canvasWrapper = ref(null);
const canvasBg = ref(null)
const canvas = ref(null)
const canvasGrid = ref(null)

let resizeObserver = null;

const canvases = [canvasBg, canvas, canvasGrid]
const scale = ref(1)

onMounted(() => {
    prefs.canvasSettings.width = 16
    prefs.canvasSettings.height = 16
    canvasStack.value.style.width = `${prefs.canvasSettings.width}px`
    canvasStack.value.style.height = `${prefs.canvasSettings.height}px`
    canvases.forEach(draw => {
        draw.value.style.width = `${prefs.canvasSettings.width}`
        draw.value.style.height = `${prefs.canvasSettings.height}`
    });
    resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            
            let desiredWidth = Math.ceil(canvasWrapper.value.getBoundingClientRect().width / prefs.canvasSettings.width);
            let desiredHeight =  Math.ceil(canvasWrapper.value.getBoundingClientRect().height / prefs.canvasSettings.height);
            scale.value = Math.min(desiredWidth, desiredHeight)
            
            canvasStack.value.style.width = `${Math.round(scale.value * prefs.canvasSettings.width)}px`
            canvasStack.value.style.height = `${Math.round(scale.value * prefs.canvasSettings.height)}px`
            const ctx = canvasGrid.value.getContext('2d');
            ctx.canvas.width  = scale.value * prefs.canvasSettings.width;
            ctx.canvas.height = scale.value * prefs.canvasSettings.height;
            drawGrid(
                canvasGrid,
                prefs.canvasSettings.width,
                prefs.canvasSettings.height,
                prefs.canvasSettings.gridSize,
                prefs.canvasSettings.gridColor,
                prefs.canvasSettings.gridWidth
            )
            drawBackground(
                canvasBg,
                prefs.canvasSettings.backgroundSize,
                prefs.canvasSettings.width,
                prefs.canvasSettings.height,
                prefs.canvasSettings.backgroundColors
            )
        }
    })
    resizeObserver.observe(canvasWrapper.value);


})
// prefs.canvasSettings.backgroundColors[0] = '#404040'
// prefs.canvasSettings.backgroundColors[1] = '#555555'
prefs.canvasSettings.backgroundSize = 2
prefs.canvasSettings.gridSize = 4
prefs.canvasSettings.gridColor = '#ffffff'


function handleMouseOnCanvas(e){
    const rect = canvas.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = Math.floor(mouseX/(rect.width/prefs.canvasSettings.width))
    const y = Math.floor(mouseY/(rect.height/prefs.canvasSettings.height))
    
    draw(canvas,x,y)
}

function handleScroll(e) {
    e.preventDefault();    

    const currentZoom = parseInt(getComputedStyle(workArea.value).getPropertyValue('--zoom'));
    let newZoom = currentZoom

    const rect = scrollArea.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left + scrollArea.value.scrollLeft;
    const mouseY = e.clientY - rect.top + scrollArea.value.scrollTop;

    if (e.deltaY < 0) {
        if (currentZoom >= prefs.canvasSettings.minZoom) return;
        newZoom = currentZoom + prefs.canvasSettings.zoomStep
    }else{
        if (currentZoom <= prefs.canvasSettings.maxZoom) return
        newZoom = currentZoom - prefs.canvasSettings.zoomStep
    }

    workArea.value.style.setProperty('--zoom', newZoom);

    const scale = newZoom / currentZoom;

    scrollArea.value.scrollLeft = (mouseX * scale) - (e.clientX - rect.left);
    scrollArea.value.scrollTop = (mouseY * scale) - (e.clientY - rect.top);
}

let isDragging = false
let startX = 0, startY = 0, scrollLeft = 0, scrollTop = 0

function handleMouseDown(e) {
    if (e.button !== 1) return // middle mouse only
    e.preventDefault()
    
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    scrollLeft = scrollArea.value.scrollLeft
    scrollTop = scrollArea.value.scrollTop

    scrollArea.value.style.cursor = 'grabbing'
}

function handleMouseMove(e) {
    if (!isDragging) return
    e.preventDefault()
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    scrollArea.value.scrollLeft = scrollLeft - dx
    scrollArea.value.scrollTop = scrollTop - dy
}

function stopDragging() {
    if (!isDragging) return
    isDragging = false
    scrollArea.value.style.cursor = 'default'
}



</script>