// export const activeSettings = defineStore('activeSettings', {
//     state: () => ({
//         paletteSettings:{
//             maxPaletteSize: 16,
//             paletteSize: 0,
//             activePaletteName: 'DEFAULT',
//             currentColor: '#FFFFFFFF',
//             palettes: {
//                 DEFAULT:  [] as { id: number, hex: string }[],
//                 PASTEL:  [] as { id: number, hex: string }[],
//             } as Record<string, { id: number; hex: string }[]>,
//         },
//         canvasSettings: {
//             width: 16,
//             height: 16,
//             minZoom: 2000,
//             maxZoom: 40,
//             zoomStep: 20,
//             showGrid: true,
//             gridSize: 4,
//             gridWidth: 2,
//             gridColor: '#FFFFFF',
//             showBackground: true,
//             backgroundSize: 4,
//             backgroundColors: ['#555555', '#757575'],
//         },
//     }),
//     actions: {
//         addColor(hex: string) {
//             const id = Date.now() + Math.random();
//             this.activePalette().push({ id, hex });
//         },
//         removeColor(index: number) {
//             this.activePalette().splice(index, 1)
//         },
//         activePalette(){
//             return this.paletteSettings.palettes[this.paletteSettings.activePaletteName]
//         },
//         setActivePalette(name: string) {
//             if (this.paletteSettings.palettes.hasOwnProperty(name)) {
//                 this.paletteSettings.activePaletteName = name
//             }
//         }
//   },
//     persist: true,
// })
type Color = { id: number; hex: string; };

export const useSettingsStore  = defineStore('settings', {
    state: () => ({
        palette: {
            maxColors:          16,
            activeColorHex:    '#FFFFFFFF',
            activePaletteName: 'DEFAULT',
            palettes: {
                DEFAULT: [] as Color[],
                PASTEL:  [] as Color[],
            } as Record<string, Color[]>,
        },
        canvas: {
            width:  16,
            height: 16,
            activeLayer: 0,
            layers: [] as number[],
            zoom: {
                minPercent:  40,
                maxPercent:  2000,
                stepPercent: 20,
            },
            showGrid: true,
            grid: {
                sizePx:      4,
                lineWidthPx: 2,
                colorHex:   '#FFFFFFFF',
            },
            showBackground: true,
            background: {
                sizePx: 4,
                colors: ['#555555FF', '#757575FF'],
            },
        },
        toolbox: {
            activeTool: 'pencil',
            pencil: {
                width: 1,
                height: 1,
            },
            eraser: {
                width: 1,
                height: 1,
            },
            fill: {},
        },
    }),
    getters: {
        activeLayer(): number     {
            return this.canvas.activeLayer;
        },
        activePalette(): Color[]  {
            return this.palette.palettes[this.palette.activePaletteName];
        },
        paletteLength(): number   {
            return this.palette.palettes[this.palette.activePaletteName].length;
        },
        isPaletteFull(): boolean  {
            return this.paletteLength >= this.palette.maxColors
        },
        isPaletteEmpty(): boolean {
            return this.paletteLength < 1
        }
    },
    actions: {
        addLayer() {
            const id = this.createCanvasId()
            this.canvas.layers.push(id);
            this.canvas.activeLayer = id;
        },
        addColor(hex: string) {
            const id = Date.now() + Math.random();
            this.activePalette.push({ id, hex });
        },
        updateColorById(id: number, hex: string) {
            const color = this.activePalette.find(c => c.id === id)
            if (color) color.hex = hex
        },
        removeColorById(id: number) {
            const idx = this.activePalette.findIndex(c => c.id === id);
            if (idx !== -1) this.activePalette.splice(idx, 1);
        },
        setActivePalette(name: string) {
            if (this.palette.palettes.hasOwnProperty(name)) {
                this.palette.activePaletteName = name;
            }
        },
        setActiveTool(name: string) {
            if (this.toolbox.hasOwnProperty(name)) this.toolbox.activeTool = name
        },
        createCanvasId(): number{
            for (let index = 0; index < this.canvas.layers.length; index++) {
                if (!this.canvas.layers.includes(index)) {
                    return index
                }           
            }
            return 0
        }
        
    },
    persist: true,
});
