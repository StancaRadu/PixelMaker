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
            showAffectedArea: true,
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
            activeTools: {
                tool1: 'pencil',
                tool2: 'eraser',
            },
            borderColor1: '#4c4b85ff',
            borderColor2: '#65b8bbff',
            pencil: {
                width: 1,
                height: 1,
                action: 'draw',
            },
            eraser: {
                width: 1,
                height: 1,
                action: 'erase',
            },
            fill: {},
        } as any,
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
        },
        activeToolSettings1(): any{
            return this.toolbox[this.toolbox.activeTools.tool1];
        },
        activeToolSettings2(): any{
            return this.toolbox[this.toolbox.activeTools.tool2];
        },
        activeToolsToArray(): string[] {
            return [this.toolbox.activeTools.tool1, this.toolbox.activeTools.tool2];    
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
        setActiveTool(name: string, tool: number) {
            if (tool == 0 && this.activeToolsToArray[1] === name) {
                this.toolbox.activeTools.tool2 = this.toolbox.activeTools.tool1;
                this.toolbox.activeTools.tool1 = name;
            } else if (tool == 2 && this.activeToolsToArray[0] === name) {
                this.toolbox.activeTools.tool1 = this.toolbox.activeTools.tool2;
                this.toolbox.activeTools.tool2 = name;
            }else if (!this.activeToolsToArray.includes(name)) {
                if (tool === 0) this.toolbox.activeTools.tool1 = name
                else if (tool === 2) this.toolbox.activeTools.tool2 = name
            }
                
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
