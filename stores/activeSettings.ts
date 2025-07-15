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
            layers: [0, 1],
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
            // this.canvas.layers = []
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
            console.log(this.canvas.layers[0]);
            
            for (let index = 0; index <= this.canvas.layers.length; index++) {
                if (!this.canvas.layers.includes(index)) {
                    console.log(index);
                    
                    return index;
                }           
            }
            return 0;
        }
        
    },
    persist: true,
});
