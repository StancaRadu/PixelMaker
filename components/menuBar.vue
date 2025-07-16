<template>
    <div id="menuBar">
        <FloatingMenu v-if="activeFloatingMenu" >
            <component v-bind:is="floatingMenus[activeFloatingMenu]"></component>
        </FloatingMenu>
        <div class="menuTab" id="menuItemFile" @mouseenter="openMenu('file')" @mouseleave="closeMenu('file')">
            <span>File</span>
            <div></div>
            <div class="hoverMenu"  v-if="activeMenus.includes('file')">
                <div class="menuItem" @click="newSprite">New</div>
                <div class="menuItem">Import</div>
                <div class="menuItem">Export</div>
                <div class="menuSplitter"></div>
                <div class="menuItem"></div>
            </div>
        </div>
        <div class="menuTab" id="menuItemView" @mouseenter="openMenu('edit')" @mouseleave="closeMenu('edit')">
            <span>Edit</span>
            <div class="hoverMenu"  v-if="activeMenus.includes('edit')"></div>
        </div>
        <div class="menuTab" id="menuItemView" @mouseenter="openMenu('view')" @mouseleave="closeMenu('view')">
            <span>View</span>
            <div class="hoverMenu" v-if="activeMenus.includes('view')">
<!-- Grid -->
                <div class="menuItem" @mouseenter="openMenu('grid')" @mouseleave="closeMenu('grid')">
                    Grid
                    <div class="hoverMenu hoverRight" v-if="activeMenus.includes('grid')">
                        <div class="menuItem">
                            <label> <input type="checkbox" v-model="settings.canvas.showGrid" /> Show grid </label>
                        </div>
                        <div class="menuItem">Grid settings</div>
                        <div class="menuItem"></div>
                    </div>
                </div>
<!-- Tile mode -->
                <div class="menuItem">Tiled Mode</div>
<!-- Background -->
                <div class="menuItem" @mouseenter="openMenu('background')" @mouseleave="closeMenu('background')">Background
                    <div class="hoverMenu hoverRight" v-if="activeMenus.includes('background')">
                        <div class="menuItem">
                            <label> <input type="checkbox" v-model="settings.canvas.showBackground" /> Show background </label>
                        </div>
    <!-- Background settings -->
                        <div class="menuItem" @click="openFloatingMenu('backgroundSettingsMenu')">Background settings
                        </div>
                        <div class="menuItem"></div>
                    </div>
                </div>
                <div class="menuSplitter"></div>
                <div class="menuItem"></div>
                <div class="menuItem"></div>
                <div class="menuItem"></div>
                <div class="menuItem"></div>
                <div class="menuItem"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#menuBar{
    display: grid;
    /* grid-auto-flow: column; */
    grid-template-columns: repeat(3, 1fr);
    justify-content: start;

    width: fit-content;
    padding: 4px;

    font-size: 1.4rem;
}
.menuTab{
    position: relative;

    border: 2px dashed #00000000;
    border-width: 0 2px;
    padding: 4px 12px;

    cursor: pointer;
    text-align: center;

    transition: all .2s;

    &:hover{
        border-color: var(--faded-orange);
    }
}
.hoverMenu{
    width: fit-content;
    min-width: 100px;
    height: fit-content;
    border: 2px solid var(--shadow-brown);
    /* border-width: 0 2px 2px 2px; */
    background-color: var(--warm-beige);
    padding: 2px 0;

    position: absolute;
    left: -2px;
    top: 100%;
    z-index: 1000;

    display: grid;
    grid-auto-flow: row;
}
.menuItem{
    width: 100%;
    min-width: max-content;
    height: fit-content;
    /* border: 2px solid transparent; */
    /* border-width: 2px 0; */
    padding: 2px calc(1rem + 6px);

    text-align: left;
    cursor: pointer;

    position: relative;

    &:hover{
        /* border-color: var(--shadow-brown); */
        background-color: var(--faded-orange);
    }

    label {
        cursor: pointer;

        position: relative;

        input[type="checkbox"]{
            position: absolute;
            aspect-ratio: 1;
            height: 1rem;
            left: calc(-1rem - 3px);
            top: calc(1rem - 1lh + 2px);
        }
    }
}
.menuSplitter{
    width: 100%;
    margin: 4px 0;
    border: 0 dashed var(--faded-orange);
    border-width: 2px;
}


.hoverRight{
    top: 0;
    left: calc(100%);
}
</style>

<script lang="ts" setup>
import backgroundSettingsMenu from './backgroundSettingsMenu.vue';

const settings = useSettingsStore();
const activeMenus = ref<string[]>([])
const activeFloatingMenu = ref<any | null>(null);
const floatingMenus = ref<Record<string, any>>({
    'backgroundSettingsMenu': backgroundSettingsMenu,
});

function openMenu(name: string){
    if (!activeMenus.value.includes(name)) activeMenus.value.push(name);
}
function closeMenu(name: string){
    activeMenus.value = activeMenus.value.filter(menu => menu !== name);
}
function closeAllMenus(){
    activeMenus.value = [];
}

function newSprite(){
    settings.canvas.layers = []
    settings.addLayer()
}


function openFloatingMenu(menuName: string) {
    activeFloatingMenu.value = menuName
}

</script>

