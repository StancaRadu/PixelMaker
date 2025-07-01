<template>
    <div id="toolbox">
        <div id="active-tool" ref="activeTool"></div>
        <div class="tool-wrapper" ref="pencil" @click="handleClick(pencil, 'pencil')">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                <path d="M3 21l1-4 11-11 4 4-11 11-4 1z"/>
                <path d="M14 7l3 3"/>
            </svg>
        </div>
        <div class="tool-wrapper" ref="eraser" @click="handleClick(eraser, 'eraser')">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                <path d="M8 17L17 8a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8L12 21H4v-4z"/>
            </svg>
        </div>
        <div class="tool-wrapper" ref="fill" @click="handleClick(fill, 'fill')">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                <path d="M12 3L2 13l4 4 10-10-4-4z"/>
                <path d="M14 7l3 3"/>
                <path d="M16 16a2 2 0 1 0 4 0c0-1.1-2-3-2-3s-2 1.9-2 3z" fill="currentColor"/>
            </svg>
        </div>
        <div class="tool-wrapper"></div>
        <div class="tool-wrapper"></div>
        <div class="tool-wrapper"></div> 
    </div>
</template>

<style scoped>
#toolbox{
    position: relative;

    width: fit-content;
    height: fit-content;
    box-shadow: inset 0 0 2px 2px var(--shadow-brown);
    border: 2px solid var(--pastel-cream);
    background-color: var(--muted-gray);

    display: grid;
    grid-auto-flow: row;
    gap: 4px;
}
.tool-wrapper{
    width: 3rem;
    height: 3rem;

    padding: 4px;
}
svg{
    position: relative;
    width: 100%;
    height: 100%;

    z-index: 2;
}

#active-tool{
    z-index: 1;

    position: absolute;
    top: 0;
    left: -2px;

    width: calc(3rem + 4px);
    height: 3rem;
    border: 2px solid var(--pastel-cream);
    border-width: 2px 0;
    background-color: var(--warm-beige);

    transition: .3s;

}

</style>

<script setup>
const settings = useSettingsStore()
const pencil = ref();
const eraser = ref();
const fill = ref();
const activeTool = ref()

function handleClick(tool, name) {
    settings.setActiveTool(name)
    activeTool.value.style.top = tool.offsetTop + 'px'

    console.log(settings.toolbox.activeTool);
    
}



</script>