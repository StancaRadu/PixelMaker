<template>
    <div id="workAreaWrapper" ref="scrollArea"
        @wheel="handleScroll"
        @mousedown="startDragToPan"
        @mousemove="dragToPan"
        @mouseup="stopDragToPan"
        @mouseleave="stopDragToPan">
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
                    <canvas id="canvasGrid" ref="canvasGrid"
                        :width=drawingWidth
                        :height=drawingHeight></canvas>
                    <canvas id="handlerCanvas" ref="handlerCanvas"
                        @mousedown="handleMouseDown"
                        @mousemove="handleMouseMove"
                        @mouseenter="drawSettings.inside = true"
                        @mouseleave="drawSettings.inside = false"
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
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: calc(100% - 200px);
    height: calc(100% - 200px);
}
#canvasStack {
    position: relative;
    
    display: flex;

    box-sizing: content-box;
    width: 100%;
    height: 100%;
    border: 4px solid var(--shadow-brown);
}   
canvas {
    position: absolute;
    width: 100%;
    height: 100%;

    image-rendering: pixelated;

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
import erase from '~/composable/canvas/erase';
import getMousePosition from '~/composable/canvas/getMousePosition';
import getAffectedAreaRect from '~/composable/canvas/getAffectedAreaRect';

const settings = useSettingsStore();

const scrollArea     = ref(null);                                                                    // Wrapper div in the center area. It stays the same size and has a scrollbar.
const workArea       = ref(null);                                                                    // Main parent. It expands on scroll and everything inside is set to total width and height.
const canvasWrapper  = ref(null);                                                                    // Wrapper for the canvas elements. It is centered in the workArea and has a fixed size.
const canvasStack    = ref(null);
const canvasBg       = ref(null);
const canvasMap      = reactive(new Map());
const canvas         = computed (()=> canvasMap.get(settings.activeLayer));
const canvasGrid     = ref(null);
const handlerCanvas  = ref(null);
const drawingWidth   = ref(settings.canvas.width);
const drawingHeight  = ref(settings.canvas.height);
const drawSettings   = ref({x: 0, y: 0, drawX: 0, drawY: 0, inside: false, ratio: 1});
const affectedPixels = ref([]);

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
        const backgroundCtx    = canvasGrid.value.getContext('2d');
        const handlerCtx = handlerCanvas.value.getContext('2d');
        
        drawSettings.value.ratio = ratio;
        canvasStack.value.style.width  = `${width}px`;
        canvasStack.value.style.height = `${height}px`;

        backgroundCtx.canvas.width  = width;
        backgroundCtx.canvas.height = height;
        handlerCtx.canvas.width  = width;
        handlerCtx.canvas.height = height;

        drawGrid(...drawGridParams.value);
    });
    drawBackground(...drawBackgroundParams.value);
    canvasObserver.observe(canvasWrapper.value);
});
watch( () => settings.canvas.showGrid,       ()=> { drawGrid(...drawGridParams.value);});
watch( () => settings.canvas.showBackground, ()=> { drawBackground(...drawBackgroundParams.value);});

function handleMouseDown(e){
    if (e.button !== 0) return; // Only handle left mouse button clicks
    const tool = settings.toolbox.activeTool
    const x    = drawSettings.value.drawX;
    const y    = drawSettings.value.drawY;

    switch (settings.toolbox.activeToolName) {
        case 'pencil': draw(canvas, affectedPixels.value, settings.palette.activeColorHex);
            break;

        case 'eraser': erase(canvas, affectedPixels.value);
            break;
    
        default: return
    }
};

function handleMouseMove(e) {
    const {drawX, drawY, mouseX, mouseY} = getMousePosition(canvas.value, e, drawingWidth.value, drawingHeight.value);
    if ( drawX === drawSettings.value.drawX && drawY === drawSettings.value.drawY ) return;
    drawSettings.value.drawX  = drawX;
    drawSettings.value.drawY  = drawY;
    drawSettings.value.mouseX = mouseX;
    drawSettings.value.mouseY = mouseY;

    affectedPixels.value = getAffectedAreaRect(drawX, drawY, settings.activeToolSettings.width, settings.activeToolSettings.height, settings.canvas.width, settings.canvas.height);
    
    if (settings.canvas.showAffectedArea && drawSettings.value.inside) {
        const handlerCanvasCtx = handlerCanvas.value.getContext('2d');
        handlerCanvasCtx.clearRect(0, 0, handlerCanvas.value.width, handlerCanvas.value.height);
        
        draw(handlerCanvas, affectedPixels.value, '#FFFFFF80', drawSettings.value.ratio);
    }
}


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
};

let origin = null;

function startDragToPan(e) {
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

function dragToPan(e) {
    if (!origin) return;

    const area = scrollArea.value
    area.scrollLeft = origin.left - (e.clientX - origin.x);
    area.scrollTop  = origin.top  - (e.clientY - origin.y);
};

function stopDragToPan() {
    if (!origin) return;
    origin = null;
    scrollArea.value.style.cursor = 'default';
};



</script>