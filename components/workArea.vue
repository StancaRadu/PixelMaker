<template>
    <div id="workAreaWrapper" ref="scrollArea"
        @wheel="handleScroll"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="stopDragging"
        @mouseleave="stopDragging">
        <div id="workArea" ref="workArea">
            <div id="canvasWrapper" class="standard-border" ref="canvasWrapper">
                <div id="canvasStack" ref="canvasStack">
                    <canvas id="canvasBg" ref="canvasBg"
                        :width=drawingWidth
                        :height=drawingHeight></canvas>
                    <canvas 
                        v-for="canvas in settings.canvas.layers"
                        :key="canvas"
                        :ref="layer => layer && canvasMap.set(canvas, layer)"
                        :width="settings.canvas.width"
                        :height="settings.canvas.height"></canvas>
                    <canvas id="handlerCanvas" ref="handlerCanvas"
                        @click="handleClick"
                        :width=drawingWidth
                        :height=drawingHeight></canvas>
                    <canvas id="canvasGrid" ref="canvasGrid"
                        :width=drawingWidth
                        :height=drawingHeight></canvas>
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
    box-shadow: inset 0 0 0px 8px var(--muted-gray),
        inset 0 0 0 10px var(--shadow-brown);
    border: 2px solid var(--shadow-brown);    
    border-width: 2px;
    background-color: var(--pastel-blue);

    overflow: scroll;

    &::-webkit-scrollbar { 
        width: 8px;
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        background-color: var(--muted-gray);
        /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    }
    &::-webkit-scrollbar-corner {
        background-color: var(--muted-gray);
    }
    &::-webkit-scrollbar-thumb { 
        background-color: var(--faded-orange);
    }
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
#handlerCanvas{
    pointer-events: all;
}
</style>

<script setup>
import draw from '~/composable/canvas/draw';
import drawGrid from '~/composable/canvas/drawGrid';
import drawBackground from '~/composable/canvas/drawBackground';

const settings = useSettingsStore();

const scrollArea    = ref(null);
const workArea      = ref(null);
const canvasWrapper = ref(null);
const canvasStack   = ref(null);
const canvasBg      = ref(null);
const canvasMap     = reactive(new Map());
const canvas        = computed (()=> canvasMap.get(settings.activeLayer));
const canvasGrid    = ref(null);
const drawingWidth  = ref(settings.canvas.width);
const drawingHeight = ref(settings.canvas.height);

const drawGridParams       = computed(()=>[
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
]);

onMounted(()=>{
    const canvasObserver  = new ResizeObserver( ()=> {
        const xPixelRatio = Math.ceil(canvasWrapper.value.getBoundingClientRect().width  / drawingWidth.value);
        const yPixelRatio = Math.ceil(canvasWrapper.value.getBoundingClientRect().height / drawingHeight.value);
        const ratio  = Math.min(xPixelRatio, yPixelRatio);
        const width  = Math.round(ratio * drawingWidth.value);
        const height = Math.round(ratio *drawingHeight.value);
        const ctx    = canvasGrid.value.getContext('2d');
        
        canvasStack.value.style.width  = `${width}px`;
        canvasStack.value.style.height = `${height}px`;

        canvasGrid.value.style.width  = `${width}px`;
        canvasGrid.value.style.height = `${height}px`;
        ctx.canvas.width  = width;
        ctx.canvas.height = height;

        drawGrid(...drawGridParams.value);
    });
    drawBackground(...drawBackgroundParams.value);
    canvasObserver.observe(canvasWrapper.value);
});
watch( () => settings.canvas.showGrid,       ()=> { drawGrid(...drawGridParams.value);});
watch( () => settings.canvas.showBackground, ()=> { drawBackground(...drawBackgroundParams.value);});

function handleClick(e){
    const tool   = settings.toolbox.activeTool
    
    const rect   = canvas.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x      = Math.floor(mouseX/(rect.width/drawingWidth.value)); //real pixels / drawing pixels
    const y      = Math.floor(mouseY/(rect.height/drawingHeight.value));
    
    draw(canvas, x, y, settings.palette.activeColorHex);
};

function handleScroll(e) {
    e.preventDefault();    

    const currentZoom = parseInt(getComputedStyle(workArea.value).getPropertyValue('--zoom'));
    const step   = settings.canvas.zoom.stepPercent;

    const rect   = scrollArea.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left + scrollArea.value.scrollLeft;
    const mouseY = e.clientY - rect.top + scrollArea.value.scrollTop;
    
    let newZoom  = currentZoom + (e.deltaY < 0 ? step : -step);
    newZoom      = Math.min(settings.canvas.zoom.maxPercent, Math.max(settings.canvas.zoom.minPercent, newZoom));
    const scale  = newZoom / currentZoom;
    
    workArea.value.style.setProperty('--zoom', newZoom);
    scrollArea.value.scrollLeft = (mouseX * scale) - (e.clientX - rect.left);
    scrollArea.value.scrollTop  = (mouseY * scale) - (e.clientY - rect.top);
}

let origin = null;

function handleMouseDown(e) {
    if (e.button !== 1) return;
    e.preventDefault();

    const area = scrollArea.value;
    origin = {
        x:    e.clientX,
        y:    e.clientY,
        left: area.scrollLeft,
        top:  area.scrollTop,
    };
    area.style.cursor = 'grabbing';
};

function handleMouseMove(e) {
    if (!origin) return;

    const area = scrollArea.value
    area.scrollLeft = origin.left - (e.clientX - origin.x);
    area.scrollTop  = origin.top  - (e.clientY - origin.y);
};

function stopDragging() {
    if (!origin) return;
    origin = null;
    scrollArea.value.style.cursor = 'default';
};



</script>