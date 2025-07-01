<template>
    <leftToolsBg class="colorPaletteWrapper">
        <div class="colorPalette-selector">
            <div id="colorPaletteSelector" class="standard-border colorPaletteButton">
                <span>Palette: {{settings.palette.activePaletteName}}</span>
            </div>
        </div>
        <div class="colorPalette-settings">
            <div id="editColorPaletteButton" class="colorPaletteButton standard-border"
                :class="{ disabled: settings.isPaletteEmpty, active: isActiveEdit }"
                @click="editColor" >EDIT</div>
            <div id="removeColorPaletteButton" class="colorPaletteButton standard-border"
                :class="{ disabled: settings.isPaletteEmpty, active: isActiveRemove }"
                @click="removeColor" >REMOVE</div>
        </div>
        <div id="colorPalette-area">
            <colorPaletteBox 
                v-for="color in colors" :key="color.id" :color="color.hex"
                :style="{ background: color.hex }"
                @click="handleClick(color.hex, color.id)"/>
            <colorPaletteBox v-if="!settings.isPaletteFull" id="addBoxButton" @click="addColor"><plusGraphic /></colorPaletteBox  >
        </div>
    </leftToolsBg>
</template>

<style scoped>
.colorPaletteWrapper {
    display: flex;
    flex-direction: column;
}
.colorPalette-settings {
    width: 100%;
    aspect-ratio: 4;
    padding: 4px;
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
}
.colorPalette-selector{
    width: 100%;
    aspect-ratio: 4;
    padding: 4px;

    display: flex;
    flex-direction: column;
}
.colorPaletteButton {
    width: 100%;
    height: 100%;
    border-width: 2px;
    background: var(--off-white);
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    cursor: pointer;
    font-size: 1.2rem;
}
.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.active {
    box-shadow: inset 0 0 4px 1px var(--shadow-brown);
    border-style: dashed;

    position: relative;
    &::after{
        content: '';
        position: absolute;
        left: 0;
        
        width: 20%;
        height: 100%;
        background-color: var(--muted-gray);
        opacity: .5;
        
        animation: slide 1s infinite alternate linear;
    }

}
@keyframes slide {
    from {
        left: 0;
    }
    to {
        left: 100%;
        transform: translateX(-100%);
    }
}

#colorPalette-area {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: inherit;
    padding: 4px;

    display: grid;
    grid-template-columns: repeat(auto-fill, min(200px, calc(25% - 3px)));
    gap: 4px;
}
#addBoxButton {
    padding: 4px;
    cursor: pointer;
}
</style>

<script setup>
const settings = useSettingsStore();

const isActiveEdit = ref(false);
const isActiveRemove = ref(false);
const colors = computed(() => settings.activePalette);

function addColor() { settings.addColor(settings.palette.activeColorHex); };

function handleClick(color, id) {
    if      (isActiveEdit.value)    settings.updateColorById(id, settings.palette.activeColorHex);
    else if (isActiveRemove.value)  settings.removeColorById(id);
    else                            settings.palette.activeColorHex = color;
    
}
function editColor() {
    if (isActiveRemove.value) { isActiveRemove.value = false; };
    isActiveEdit.value = !isActiveEdit.value;
}
function removeColor() {
    if (isActiveEdit.value) { isActiveEdit.value = false; }
    isActiveRemove.value = !isActiveRemove.value;
}
</script>







