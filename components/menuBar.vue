<template>
    <div id="menuBar">
        <div class="menuTab" id="menuItemFile" @mouseenter="openMenu('file')" @mouseleave="closeMenu('file')">
            <span>File</span>
            <div class="hoverMenu"  v-if="activeMenus.includes('file')"></div>
        </div>
        <div class="menuTab" id="menuItemView" @mouseenter="openMenu('edit')" @mouseleave="closeMenu('edit')">
            <span>Edit</span>
            <div class="hoverMenu"  v-if="activeMenus.includes('edit')"></div>
        </div>
        <div class="menuTab" id="menuItemView" @mouseenter="openMenu('view')" @mouseleave="closeMenu('view')">
            <span>View</span>
            <div class="hoverMenu" v-if="activeMenus.includes('view')">
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
                <div class="menuItem">Tiled Mode</div>
                <div class="menuItem" @mouseenter="openMenu('background')" @mouseleave="closeMenu('background')">
                    Background
                    <div class="hoverMenu hoverRight" v-if="activeMenus.includes('background')">
                        <div class="menuItem">
                            <label> <input type="checkbox" v-model="settings.canvas.showBackground" /> Show background </label>
                        </div>
                        <div class="menuItem">Grid settings</div>
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
    border: 2px solid transparent;
    border-width: 2px 0;
    padding: 2px 6px;

    text-align: left;
    cursor: pointer;

    position: relative;

    &:hover{
        border-color: var(--shadow-brown);
    }

    label { cursor: pointer }
}
.menuSplitter{
    width: 100%;
    border: 0 dashed var(--faded-orange);
    border-width: 2px;
}


.hoverRight{
    top: -2px;
    left: calc(100%);
}
</style>

<script setup>
const settings = useSettingsStore();
const activeMenus = ref([])

function openMenu(name){
    if (!activeMenus.value.includes(name)) {
        activeMenus.value.push(name)
    }
}
function closeMenu(name){
    activeMenus.value = activeMenus.value.filter(m => m !== name)
}

</script>