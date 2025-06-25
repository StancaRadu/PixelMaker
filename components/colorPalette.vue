<template>
    <leftToolsBg>
        <div id="colorPallete-area">
            <colorPaletteBox 
                v-for="color in colors" :key="color.id" :color="color.hex"
                :style="{ background: color.hex }"
                v-if="isMounted"
                @click="changeColor(color.hex)"/>
            <colorPaletteBox v-if="allowAddColors" id="addBoxButton" @click="addColor" > <plusGraphic /> </colorPaletteBox  >
        </div>
    </leftToolsBg>
</template>

<style scoped>
#colorPallete-area {
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
let isMounted = ref(false);
const prefs = activeSettings()
const allowAddColors = ref(true);
const colors = computed(() => prefs.currentColors)

onMounted(() => {
    isMounted.value = true
    if (prefs.currentColors.length >= prefs.maxPaletteSize) allowAddColors.value = false;
})

// prefs.currentColors = []

function addColor() {
    prefs.addColor(prefs.currentColor)
    
    const paletteSize = prefs.currentColors.length;
    
    if (paletteSize >= prefs.maxPaletteSize) allowAddColors.value = false;
}
function changeColor(color) {
    prefs.currentColor = color;
}   

</script>







