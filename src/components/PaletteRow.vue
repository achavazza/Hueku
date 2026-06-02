<template>
  <div
    class="row"
    :class="{ 'is-selected': selected }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="hovered = true"
    @focusout="hovered = false"
  >
    <div
      v-for="col in palette.colors"
      :key="col.id"
      class="swatch"
      :style="{ backgroundColor: col.hex }"
    >
      <span class="swatch-label" :style="{ color: getLabelColor(col) }">
        {{ col.name }}
      </span>
      <div v-if="hovered" class="actions" :style="{ color: getLabelColor(col) }">
        <button
          class="action"
          @click.stop="explore(col)"
          @focusin.stop
        >explore</button>
        <button
          class="action"
          @click.stop="copyHex(col)"
          @focusin.stop
        >copy HEX</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getContrastTextColor } from '../utils/color'

const props = defineProps({
  palette: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const hovered = ref(false)

function getLabelColor(col) {
  return getContrastTextColor(col.rgb[0], col.rgb[1], col.rgb[2])
}

function explore(col) {
  router.push({ name: 'color-detail', params: { id: col.id } })
}

function copyHex(col) {
  navigator.clipboard.writeText(col.hex)
}
</script>

<style scoped>
.row {
  display: flex;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  padding: 0;
}

.row.is-selected {
  opacity: 1;
}

.swatch {
  flex: 1;
  min-width: 0;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2px;
}

.swatch-label {
  font-size: 14px;
  font-weight: var(--font-weight-light);
  pointer-events: none;
  white-space: nowrap;
  letter-spacing: 0.02em;
  padding: 2px 4px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.row:hover .swatch-label,
.row:focus-within .swatch-label {
  opacity: 0.6;
}

.actions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  pointer-events: auto;
}

.action {
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
  opacity: 0.8;
  transition: opacity var(--transition-fast);
  padding: 1px 4px;
  line-height: 1.3;
}

.action:hover,
.action:focus-visible {
  opacity: 1;
  outline: 1px solid currentColor;
  outline-offset: 1px;
}
</style>
