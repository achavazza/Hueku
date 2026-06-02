<template>
  <div class="home">
    <header class="header">
      <h1 class="logo">Hueku</h1>
      <div class="about-toggle" @click="aboutOpen = !aboutOpen">
        <span v-if="!aboutOpen">About</span>
        <span v-else>Close</span>
      </div>
    </header>
    <div v-if="aboutOpen" class="about">
      <p>Based on <em>A Dictionary of Color Combinations</em> (1935) by Sanzo Wada (1883–1967), a Japanese painter, art director, and costume designer. His systematic collection of 348 color combinations reflects the traditional Japanese color sensibility and remains a seminal reference for designers worldwide.</p>
    </div>
    <ColorGrid />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useColorsStore } from '../stores/colorsStore'
import { usePalettesStore } from '../stores/palettesStore'
import ColorGrid from '../components/ColorGrid.vue'

const aboutOpen = ref(false)

const colorsStore = useColorsStore()
const palettesStore = usePalettesStore()

onMounted(() => {
  colorsStore.init()
  palettesStore.init()
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 20px;
  border-bottom: 1px solid #000;
  flex-shrink: 0;
}

.logo {
  font-size: 18px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.08em;
  text-transform: lowercase;
}

.about-toggle {
  font-size: 12px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.03em;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}

.about-toggle:hover {
  opacity: 1;
}

.about {
  padding: 16px 20px;
  border-bottom: 1px solid #000;
  font-size: 12px;
  font-weight: var(--font-weight-light);
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--color-text);
  flex-shrink: 0;
}

.about em {
  font-style: italic;
}

.grid {
  flex: 1;
}
</style>
