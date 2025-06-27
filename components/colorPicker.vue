<template>
    <leftToolsBg>
        <div id="colorPicker"
            :style="{ backgroundColor: isMounted ? prefs.paletteSettings.currentColor : '#FFFFFFFF' }"
            :class="{ 'activeBorder': showColorMenu }"
            @click="openColorMenu">
            <span>{{ isMounted ? prefs.paletteSettings.currentColor : '#FFFFFFFF' }}</span>
            <floatingMenu class="colorPickerMenu"
                v-if="showColorMenu"
                @click.stop>
                <div id="colorMenu">
                <div id="colorTabs">
                    <div class="colorTab">RGB</div>
                    <div class="colorTab">HSL</div>
                    <div class="colorTab">HVL</div>
                </div>
                <div id="titleBar"></div>
                <div id="colorArea">
                    <div class="colorSelector" id="colorSelectorRGB">
                        <div class="colorSliderContainer">
                            <span>R</span>
                            <div class="colorSlider" id="colorSliderRed" ref="R"
                                :style="{ background: gradientR }"
                                @mousedown="startDrag">
                                    <div class="slider-thumb" 
                                    :style="{ 
                                        left: valR + 'px',
                                        // backgroundColor: `rgb(${valR}, ${valG}, ${valB})`
                                    }"></div>
                            </div>
                            <input 
                                id="colorInputRed" class="colorInput" 
                                v-model.number="valR"
                                type="number"
                                min="0" max="255"/>
                        </div>
                        <div class="colorSliderContainer">
                            <span>G</span>
                            <div class="colorSlider" id="colorSliderGreen" :style="{ background: gradientG }"
                                @mousedown="startDrag">
                                    <div class="slider-thumb" 
                                    :style="{ 
                                        left: valG + 'px',
                                        // backgroundColor: `rgb(${valR}, ${valG}, ${valB})`
                                    }"></div>
                            </div>
                            <input 
                                id="colorInputGreen" class="colorInput" 
                                v-model.number="valG"
                                type="number"
                                min="0" max="255"/>
                        </div>
                        <div class="colorSliderContainer">
                            <span>B</span>
                            <div class="colorSlider" id="colorSliderBlue" :style="{ background: gradientB }"
                                @mousedown="startDrag">
                                    <div class="slider-thumb" 
                                    :style="{ 
                                        left: valB + 'px',
                                        // backgroundColor: `rgb(${valR}, ${valG}, ${valB})`
                                    }"></div>
                            </div>
                            <input 
                                id="colorInputBlue" class="colorInput" 
                                v-model.number="valB"
                                type="number"
                                min="0" max="255"/>
                        </div>
                    </div>
                    
                    <!-- <div class="colorSelector" id="colorSelectorHSL"></div> -->
                    <!-- <div class="colorSelector" id="colorSelectorHSV"></div> -->
                </div>
                </div>
            </floatingMenu>
            
        </div>
    </leftToolsBg>
</template>

<style scoped>
leftToolsBg {
    position: relative;
}

#colorPicker {
    /* position: relative;   */
    width: 100%;
    height: 30px;
    /* border: 2px dashed var(--off-white); */
    /* box-shadow: inset 0 0 2px 2px var(--shadow-brown); */

    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: inherit;
    cursor: pointer;
}

.colorPickerMenu {
    bottom: calc(100% + 2px);
    left: -2px;
}

#colorMenu{
    width: fit-content;
    height: 200px;

    display: grid;
    grid-template-areas: 
        "tabs titleBar"
        "colors colors";

    grid-template-rows: auto 1fr;
    grid-template-columns: auto auto;

    cursor: default;
}

#colorTabs {
    grid-area: tabs;

    padding: 2px;
    
    display: grid;
    grid-template-columns: repeat(3, min-content);
    gap: 4px;
}
.colorTab {
    display: flex;
    justify-content: center;    
    align-items: center;

    border: 2px solid var(--shadow-brown);
    padding: 0 2px;
    background-color: var(--warm-beige);

    font-size: 2rem;
    cursor: pointer;
}

#titleBar {
    grid-area: titleBar;

    width: 100%;
    height: 100%;
}

#colorArea {
    width: fit-content;
    grid-area: colors;

    border-top: 4px dashed var(--shadow-brown);
    box-shadow: inset 0 -3px 0 0 var(--muted-gray);
}
.colorSelector {
    width: fit-content;
    height: 100%;
    /* background-color: blueviolet; */

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.colorSliderContainer {
    width: fit-content;
    height: 2lh;
    padding: 0 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    span{ font-size: 2rem; }
}
.colorSlider {
    width: 255px;
    height: 1.2rem;
    /* border: 2px solid var(--shadow-brown); */
    box-shadow: 0 0 0 2px var(--off-white),
                0 0 0 4px var(--shadow-brown);
}
.slider-thumb {
    mouse-events: none;
    position: absolute;
    top: -6px;
    width: 8px;
    height: calc(100% + 12px);
    background: none;
    border: 2px solid var(--shadow-brown);
    transform: translateX(-50%);
    pointer-events: none;
    position: relative;
    cursor: pointer;
}
.colorInput {
    height: 100%;

    font-size: 2rem;
    background-color: inherit;
    border: none;
    border-bottom: 2px dashed var(--shadow-brown)   ;
}



.activeBorder {
    border: 2px solid var(--off-white);
    box-shadow: inset 0 0 2px 2px var(--shadow-brown);
}
</style>

<script setup>
const prefs = activeSettings()
const isMounted = ref(false)
let showColorMenu = ref(false)

let valR = ref()
let valB = ref()
let valG = ref()

onMounted(() => {
    isMounted.value = true
})

watch([valR, valG, valB], ([r, g, b]) => {
    const clampedR = Math.min(Math.max(r, 0), 255)
    const clampedG = Math.min(Math.max(g, 0), 255)
    const clampedB = Math.min(Math.max(b, 0), 255)

    if (clampedR !== r) valR.value = clampedR
    if (clampedG !== g) valG.value = clampedG
    if (clampedB !== b) valB.value = clampedB

    prefs.paletteSettings.currentColor = `#${[clampedR, clampedG, clampedB]
        .map(v => v.toString(16).padStart(2, '0'))
        .join('')}`.toUpperCase() + 'FF'

})

watch(
  () => prefs.paletteSettings.currentColor,
  (newHex) => {
    const hex = newHex.replace('#', '').slice(0, 6)
    if (hex.length === 6) {
      valR.value = parseInt(hex.slice(0, 2), 16)
      valG.value = parseInt(hex.slice(2, 4), 16)
      valB.value = parseInt(hex.slice(4, 6), 16)
    }
  },
  { immediate: true }
)

const gradientR = computed(() => 
    `linear-gradient(90deg, rgba(0, ${valG.value}, ${valB.value}, 1) 0%, rgba(255, ${valG.value}, ${valB.value}, 1) 100%)`)
const gradientG = computed(() => 
    `linear-gradient(90deg, rgba(${valR.value}, 0, ${valB.value}, 1) 0%, rgba(${valR.value}, 255, ${valB.value}, 1) 100%)`)
const gradientB = computed(() => 
    `linear-gradient(90deg, rgba(${valR.value}, ${valG.value}, 0, 1) 0%, rgba(${valR.value}, ${valG.value}, 255, 1) 100%)`)

function openColorMenu(){ showColorMenu.value = !showColorMenu.value }
function startDrag(e) {
    e.preventDefault()

    const startPosition = e.clientX;
    const startV = e.offsetX;
    let val;

    switch (e.target.id) {
        case 'colorSliderRed': val = valR; break
        case 'colorSliderGreen': val = valG; break
        case 'colorSliderBlue': val = valB; break
    }
    
    const move = (e) => {
        const distance = e.clientX - startPosition;
        val.value = startV + distance;
    }
    const stop = () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', stop)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stop)
    
    move(e)
}
</script>