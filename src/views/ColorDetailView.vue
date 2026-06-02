<template>
  <div v-if="color" class="detail">
    <ColorDetailPanel :color="color" />
    <PaletteExplorer :color-id="color.id" />
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useColorsStore } from '../stores/colorsStore'
import { usePalettesStore } from '../stores/palettesStore'
import ColorDetailPanel from '../components/ColorDetailPanel.vue'
import PaletteExplorer from '../components/PaletteExplorer.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const colorsStore = useColorsStore()
const palettesStore = usePalettesStore()

const color = computed(() => colorsStore.colorById(props.id))

onMounted(() => {
  colorsStore.init()
  palettesStore.init()
  colorsStore.selectColor(props.id)
})

watch(() => props.id, (newId) => {
  colorsStore.selectColor(newId)
})
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.detail > :first-child {
  border-right: 1px solid #000;
}

@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
    grid-template-rows: 50vh 50vh;
  }
  .detail > :first-child {
    border-right: none;
    border-bottom: 1px solid #000;
  }
}
</style>
