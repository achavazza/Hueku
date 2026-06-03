<template>
  <div class="explorer">
    <div
      v-for="(palette, i) in palettes"
      :key="palette.id"
      class="row-wrapper"
      :class="{ 'is-last': i === palettes.length - 1 }"
      :style="rowHeightStyle"
    >
      <PaletteRow
        :palette="palette"
        :selected="palette.id === selectedPaletteId"
        @select="selectPalette(palette.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePalettesStore } from '../stores/palettesStore'
import PaletteRow from './PaletteRow.vue'

const props = defineProps({
  colorId: {
    type: Number,
    required: true,
  },
})

const palettesStore = usePalettesStore()

const palettes = computed(() => palettesStore.palettesForSelectedColor)
const selectedPaletteId = computed(() => palettesStore.selectedPaletteId)

const paletteCount = computed(() => palettes.value.length)

const rowHeightStyle = computed(() => {
  const count = paletteCount.value
  if (count === 0) return {}
  if (count <= 4) {
    return { height: `${100 / count}vh` }
  }
  return { height: `max(calc(100vh / ${count}), 120px)` }
})

function selectPalette(id) {
  palettesStore.selectPalette(id === selectedPaletteId.value ? null : id)
}
</script>

<style scoped>
.explorer {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
}

.row-wrapper {
  flex-shrink: 0;
  min-height: var(--row-min-height);
  width: 100%;
  border-bottom: 1px solid var(--border-color, #000);
}

.row-wrapper.is-last {
  border-bottom: none;
}
</style>
