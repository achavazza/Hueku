<template>
  <router-view />
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useColorsStore } from './stores/colorsStore'

const route = useRoute()
const colorsStore = useColorsStore()

function setFavicon(color) {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(8, 8, 6, 0, Math.PI * 2)
  ctx.fill()
  let link = document.querySelector('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    document.head.appendChild(link)
  }
  link.href = canvas.toDataURL()
}

onMounted(() => {
  setFavicon('#000000')
})

watch(
  () => colorsStore.selectedColorId,
  (id) => {
    if (!id) {
      setFavicon('#000000')
      return
    }
    const color = colorsStore.colorById(id)
    if (color) setFavicon(color.hex)
  },
)

watch(
  () => route.name,
  (name) => {
    if (name === 'home') {
      setFavicon('#000000')
    }
  },
)
</script>
