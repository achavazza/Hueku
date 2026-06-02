<template>
  <button
    class="tile"
    :style="{ backgroundColor: color.hex }"
    @click="navigate"
    :aria-label="color.name"
  >
    <span class="label" :style="{ color: labelColor }">{{ color.name }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getContrastTextColor } from '../utils/color'

const props = defineProps({
  color: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const labelColor = computed(() =>
  getContrastTextColor(props.color.rgb[0], props.color.rgb[1], props.color.rgb[2]),
)

function navigate() {
  router.push({ name: 'color-detail', params: { id: props.color.id } })
}
</script>

<style scoped>
.tile {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  overflow: hidden;
}

.tile:hover,
.tile:focus-visible {
  opacity: 0.85;
}

.label {
  font-size: 14px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.02em;
  opacity: 0;
  transition: opacity var(--transition-fast);
  text-align: center;
  line-height: 1.1;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.tile:hover .label,
.tile:focus-visible .label {
  opacity: 0.6;
}
</style>
