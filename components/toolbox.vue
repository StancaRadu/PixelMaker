<template>
    <div id="toolbox">
        <div class="tool-wrapper" ref="pencil" @mousedown.prevent="handleClick($event, 'pencil')"
            :style="{ 
                '--opacity': settings.activeToolsToArray.includes('pencil') ? 1 : 0,
                '--scale': settings.toolbox.activeTools.tool1 === 'pencil' ? 1 : settings.toolbox.activeTools.tool2 === 'pencil' ? .9 : .8,
                '--borderColor': settings.toolbox.activeTools.tool1 === 'pencil' ? settings.toolbox.borderColor1 : settings.toolbox.activeTools.tool2 === 'pencil' ? settings.toolbox.borderColor2 : '#ffffff',
            }">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                <path d="M3 21l1-4 11-11 4 4-11 11-4 1z"/>
                <path d="M14 7l3 3"/>
            </svg>
        </div>
        <div class="tool-wrapper" ref="eraser" @mousedown.prevent="handleClick($event, 'eraser')" 
            :style="{ 
                '--opacity': settings.activeToolsToArray.includes('eraser') ? 1 : 0,
                '--scale': settings.toolbox.activeTools.tool1 === 'eraser' ? 1 : settings.toolbox.activeTools.tool2 === 'eraser' ? .9 : .8,
                '--borderColor': settings.toolbox.activeTools.tool1 === 'eraser' ? settings.toolbox.borderColor1 : settings.toolbox.activeTools.tool2 === 'eraser' ? settings.toolbox.borderColor2 : '#ffffff',
            }">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                <path d="M8 17L17 8a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8L12 21H4v-4z"/>
            </svg>
        </div>
        <div class="tool-wrapper" ref="fill" @mousedown.prevent="handleClick($event, 'fill')" 
            :style="{ 
                '--opacity': settings.activeToolsToArray.includes('fill') ? 1 : 0,
                '--scale': settings.toolbox.activeTools.tool1 === 'fill' ? 1 : settings.toolbox.activeTools.tool2 === 'fill' ? .9 : .8,
                '--borderColor': settings.toolbox.activeTools.tool1 === 'fill' ? settings.toolbox.borderColor1 : settings.toolbox.activeTools.tool2 === 'fill' ? settings.toolbox.borderColor2 : '#ffffff',
            }">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                <path d="M12 3L2 13l4 4 10-10-4-4z"/>
                <path d="M14 7l3 3"/>
                <path d="M16 16a2 2 0 1 0 4 0c0-1.1-2-3-2-3s-2 1.9-2 3z" fill="currentColor"/>
            </svg>
        </div>
    </div>
</template>

<style scoped>
#toolbox{
    position: relative;

    width: fit-content;
    height: fit-content;

    display: grid;
    grid-auto-flow: row;
    gap: 8px;
}
.tool-wrapper{
    position: relative;

    width: 3rem;
    height: 3rem;

    padding: 4px;

    scale: var(--scale);

    transition: .5s;

    /* overflow: hidden; */

    &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;

        box-sizing: border-box;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 4px 2px var(--shadow-brown);
        border: 4px solid var(--borderColor);

        opacity: var(--opacity);

        transition: opacity .5s;
    }
}
svg{
    position: relative;
    width: 100%;
    height: 100%;

    z-index: 2;
}
/* 
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

    transition: .3s ease;

} */

</style>

<script setup>
const settings = useSettingsStore()
const pencil = ref();
const eraser = ref();
const fill = ref();
const activeTool = ref()

function handleClick(e, name) {
    settings.setActiveTool(name, e.button)

    // settings.toolbox.borderColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // settings.toolbox.borderColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
}


// document.documentElement.style.setProperty('--toolBorderColor1', settings.toolbox.borderColor1);
// watch(() => settings.toolbox.borderColor1, (newColor) => {
//     document.documentElement.style.setProperty('--toolBorderColor', newColor);
// });



</script>