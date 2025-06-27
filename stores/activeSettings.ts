export const activeSettings = defineStore('activeSettings', {
    state: () => ({
        paletteSettings:{
            maxPaletteSize: 16,
            paletteSize: 0,
            activePaletteName: 'default',
            currentColor: '#FFFFFFFF',
            palettes: {
                default:  [] as { id: number, hex: string }[],
                pastel:  [] as { id: number, hex: string }[],
            } as Record<string, { id: number; hex: string }[]>,
        },
        canvasSettings: {
            width: 16,
            height: 16,
            minZoom: 2000,
            maxZoom: 40,
            zoomStep: 20,
            gridSize: 4,
            gridWidth: 2,
            gridColor: '#2020FF',
            backgroundSize: 4,
            backgroundColors: ['#303030', '#505050'],
        },
    }),
    actions: {
        addColor(hex: string) {
            const id = Date.now() + Math.random();
            this.activePalette().push({ id, hex });
        },
        removeColor(index: number) {
            this.activePalette().splice(index, 1)
        },
        activePalette(){
            return this.paletteSettings.palettes[this.paletteSettings.activePaletteName]
        },
        setActivePalette(name: string) {
            if (this.paletteSettings.palettes.hasOwnProperty(name)) {
                this.paletteSettings.activePaletteName = name
            }
        }
  },
    persist: true,
})