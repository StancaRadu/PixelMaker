<template>
    <div id="workAreaWrapper" class="standard-border" ref="scrollArea"
        @wheel="handleScroll"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="stopDragging"
        @mouseleave="stopDragging">
        <div id="workArea" ref="workArea">
            <div id="canvasWrapper" class="standard-border" ref="canvasWrapper">
                <div id="canvasStack" ref="canvasStack" v-if="isMounted">
                    <canvas id="canvasBg" ref="canvasBg"
                        :width=pixelsOnX
                        :height=pixelsOnY></canvas>
                    <canvas id="canvas" ref="canvas"
                        :width=pixelsOnX
                        :height=pixelsOnY
                        @click="handleClick"></canvas>
                    <canvas id="canvasGrid" ref="canvasGrid"
                            :width=pixelsOnX
                            :height=pixelsOnY></canvas>
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

const settings = useSettingsStore();

const isMounted = ref(false)

const workArea = ref(null)
const scrollArea = ref(null)
const canvasStack = ref(null)
const canvasWrapper = ref(null);
const canvasBg = ref(null)
const canvas = ref(null)
const canvasGrid = ref(null)

let pixelsOnX = ref(settings.canvas.width)
let pixelsOnY = ref(settings.canvas.height)

const canvases = [canvasBg, canvas, canvasGrid]

const drawGridParams = computed(()=>[
    canvasGrid,
    settings.canvas.width,
    settings.canvas.height, 
    settings.canvas.grid.sizePx,
    settings.canvas.grid.colorHex,
    settings.canvas.grid.lineWidthPx,
    !settings.canvas.showGrid
])

const drawBackgroundParams = computed(()=>[
    canvasBg,
    settings.canvas.background.sizePx,
    settings.canvas.background.colors,
    !settings.canvas.showBackground
]) 

onMounted(()=>{
    isMounted.value = true
    nextTick(()=>{
        const canvasObserver = new ResizeObserver( ()=> {
            const xPixelRatio = Math.ceil(canvasWrapper.value.getBoundingClientRect().width / pixelsOnX.value);
            const yPixelRatio =  Math.ceil(canvasWrapper.value.getBoundingClientRect().height / pixelsOnY.value);
            const ratio = Math.min(xPixelRatio, yPixelRatio);
            const width = Math.round(ratio * pixelsOnX.value)
            const height = Math.round(ratio *pixelsOnY.value)
            
            canvasStack.value.style.width = `${width}px`
            canvasStack.value.style.height = `${height}px`

            canvasGrid.value.style.width = `${width}px`
            canvasGrid.value.style.height = `${height}px`
            const ctx = canvasGrid.value.getContext('2d')
            ctx.canvas.width = width
            ctx.canvas.height = height

            drawGrid(...drawGridParams.value)
        })
        
        canvasObserver.observe(canvasWrapper.value)
    
        drawBackground(...drawBackgroundParams.value)
    })
})
watch( () => settings.canvas.showGrid,
    () => { drawGrid(...drawGridParams.value) }
)
watch( () => settings.canvas.showBackground,
    ()=>{ 
        console.log(settings.canvas.showBackground);
        
        drawBackground(...drawBackgroundParams.value) 
    }
)

function handleClick(e){
    const rect = canvas.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = Math.floor(mouseX/(rect.width/pixelsOnX.value)) //real pixels / drawing pixels
    const y = Math.floor(mouseY/(rect.height/pixelsOnY.value))
    
    draw(canvas, x, y, settings.palette.activeColorHex)
}

function handleScroll(e) {
    e.preventDefault();    

    const currentZoom = parseInt(getComputedStyle(workArea.value).getPropertyValue('--zoom'));
    const step = settings.canvas.zoom.stepPercent;

    const rect = scrollArea.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left + scrollArea.value.scrollLeft;
    const mouseY = e.clientY - rect.top + scrollArea.value.scrollTop;
    
    let newZoom = currentZoom + (e.deltaY < 0 ? step : -step);
    newZoom = Math.min(settings.canvas.zoom.maxPercent, Math.max(settings.canvas.zoom.minPercent, newZoom));
    const scale = newZoom / currentZoom;
    
    workArea.value.style.setProperty('--zoom', newZoom);
    scrollArea.value.scrollLeft = (mouseX * scale) - (e.clientX - rect.left);
    scrollArea.value.scrollTop = (mouseY * scale) - (e.clientY - rect.top);
}

let origin = null

function handleMouseDown(e) {
    if (e.button !== 1) return
    e.preventDefault()

    const scrollable = scrollArea.value
    origin = {
        x: e.clientX,
        y: e.clientY,
        left: scrollable.scrollLeft,
        top: scrollable.scrollTop,
    }
    scrollable.style.cursor = 'grabbing'
}

function handleMouseMove(e) {
    if (!origin) return

    const scrollable = scrollArea.value
    scrollable.scrollLeft = origin.left - (e.clientX - origin.x)
    scrollable.scrollTop  = origin.top  - (e.clientY - origin.y)
}

function stopDragging() {
    if (!origin) return
    origin = null
    scrollArea.value.style.cursor = 'default'
}



</script>