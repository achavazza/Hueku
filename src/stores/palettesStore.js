import { defineStore } from 'pinia'
import { useColorsStore } from './colorsStore'

export const usePalettesStore = defineStore('palettes', {
  state: () => ({
    palettes: [],
    selectedPaletteId: null,
  }),

  getters: {
    allPalettes(state) {
      return state.palettes
    },

    palettesForSelectedColor() {
      const colorsStore = useColorsStore()
      const selected = colorsStore.selectedColor
      if (!selected) return []
      return this.allPalettes.filter((p) =>
        p.colorIds.includes(selected.id),
      )
    },

    selectedPalette(state) {
      if (!state.selectedPaletteId) return null
      return state.palettes.find(
        (p) => p.id === state.selectedPaletteId,
      ) || null
    },
  },

  actions: {
    buildPalettes() {
      const colorsStore = useColorsStore()
      const palettesMap = {}

      colorsStore.allColors.forEach((color) => {
        color.combinations.forEach((paletteId) => {
          if (!palettesMap[paletteId]) {
            palettesMap[paletteId] = []
          }
          palettesMap[paletteId].push(color.id)
        })
      })

      this.palettes = Object.entries(palettesMap).map(([id, colorIds]) => ({
        id: Number(id),
        colorIds,
        colors: colorIds
          .map((cid) => colorsStore.colorById(cid))
          .filter(Boolean),
      }))
    },

    init() {
      if (this.palettes.length > 0) return
      this.buildPalettes()
    },

    selectPalette(id) {
      this.selectedPaletteId = id
    },
  },
})
