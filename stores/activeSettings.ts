export const activeSettings = defineStore('activeSettings', {
    state: () => ({
        maxPaletteSize: 16,
        paletteSize: 0,
        currentColors: [] as { id: number, hex: string }[],
        currentColor: '#FFFFFFFF'
    }),
    actions: {
        addColor(hex: string) {
            const id = Date.now() + Math.random()
            this.currentColors.push({ id, hex })
        },
        removeColor(index: number) { this.currentColors.splice(index, 1) },
  },
    persist: true,
})