<template>
  <div class="home">
    <header class="header">
      <h1 class="logo">Hueku</h1>
      <input
        class="search"
        type="text"
        v-model="query"
        placeholder="Search"
        @keydown.enter="search"
      />
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
import { useRouter } from 'vue-router'
import { useColorsStore } from '../stores/colorsStore'
import { usePalettesStore } from '../stores/palettesStore'
import { hexToRgb, colorDistance } from '../utils/color'
import ColorGrid from '../components/ColorGrid.vue'

const router = useRouter()
const aboutOpen = ref(false)
const query = ref('')

const colorsStore = useColorsStore()
const palettesStore = usePalettesStore()

onMounted(() => {
  colorsStore.init()
  palettesStore.init()
})

function search() {
  const q = query.value.trim()
  if (!q) return

  const isHex = /^#?[0-9a-f]{6}$/i.test(q)
  if (isHex) {
    const rgb = hexToRgb(q)
    if (!rgb) return
    let best = null
    let bestDist = Infinity
    for (const c of colorsStore.colors) {
      const d = colorDistance(rgb, c.rgb)
      if (d < bestDist) {
        bestDist = d
        best = c
      }
    }
    if (best) router.push({ name: 'color-detail', params: { id: best.id } })
  } else {
    const lower = q.toLowerCase()
    const match = colorsStore.colors.find((c) =>
      c.name.toLowerCase().includes(lower),
    )
    if (match) router.push({ name: 'color-detail', params: { id: match.id } })
  }

  query.value = ''
}
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
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #000;
  flex-shrink: 0;
  gap: 16px;
}

.logo {
  font-size: 18px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-shrink: 0;
}

.search {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid #000;
  background: none;
  padding: 6px 10px;
  outline: none;
  color: var(--color-text);
  flex: 1;
  max-width: 280px;
}

.search::placeholder {
  color: #999;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.search:focus {
  background: #f5f5f5;
}

.about-toggle {
  font-size: 11px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
  flex-shrink: 0;
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
