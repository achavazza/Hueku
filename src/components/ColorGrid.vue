<template>
  <div class="grid">
    <ColorTile
      v-for="color in colors"
      :key="color.id"
      :color="color"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useColorsStore } from '../stores/colorsStore'
import ColorTile from './ColorTile.vue'

const colorsStore = useColorsStore()
const colors = computed(() => colorsStore.allColors)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
