import { defineStore } from 'pinia'
import { rgbToHsl, rgbToLab } from '../utils/color'
import rawColors from '../assets/colors.json'

export const useColorsStore = defineStore('colors', {
  state: () => ({
    colors: [],
    selectedColorId: null,
    colorsMap: {},
  }),

  getters: {
    allColors(state) {
      return state.colors
    },

    selectedColor(state) {
      return state.colors.find((c) => c.id === state.selectedColorId) || null
    },

    colorById(state) {
      return (id) => state.colors.find((c) => c.id === id) || null
    },
  },

  actions: {
    init() {
      if (this.colors.length > 0) return
      this.colors = rawColors.colors.map((c) => ({
        id: c.index,
        name: c.name,
        hex: c.hex,
        rgb: c.rgb_array,
        hsl: rgbToHsl(c.rgb_array[0], c.rgb_array[1], c.rgb_array[2]),
        lab: rgbToLab(c.rgb_array[0], c.rgb_array[1], c.rgb_array[2]),
        combinations: c.combinations,
      }))
    },

    selectColor(id) {
      this.selectedColorId = id
    },
  },
})
