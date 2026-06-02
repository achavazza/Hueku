<template>
  <div
    class="panel"
    :style="{
      backgroundColor: color.hex,
      color: textColor,
    }"
  >
    <button class="back" :style="{ color: textColor }" @click="goBack">
      ← Back
    </button>
    <div class="info">
      <h1 class="name">{{ color.name }}</h1>
      <dl class="values">
        <div class="row">
          <dt>HEX</dt>
          <dd>{{ color.hex }}</dd>
        </div>
        <div class="row">
          <dt>RGB</dt>
          <dd>{{ color.rgb.join(', ') }}</dd>
        </div>
        <div class="row">
          <dt>HSL</dt>
          <dd>{{ color.hsl.h }}° {{ color.hsl.s }}% {{ color.hsl.l }}%</dd>
        </div>
        <div class="row">
          <dt>LAB</dt>
          <dd>{{ color.lab.l }} {{ color.lab.a }} {{ color.lab.b }}</dd>
        </div>
        <div class="row">
          <dt>WADA ID</dt>
          <dd>{{ color.id }}</dd>
        </div>
      </dl>
    </div>
  </div>
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

const textColor = computed(() =>
  getContrastTextColor(props.color.rgb[0], props.color.rgb[1], props.color.rgb[2]),
)

function goBack() {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  position: relative;
  transition: background-color var(--transition-fast);
}

.back {
  font-size: 14px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.02em;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  align-self: flex-start;
  text-align: left;
}

.back:hover,
.back:focus-visible {
  opacity: 1;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.name {
  font-size: 20px;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.values {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.row {
  display: flex;
  gap: 8px;
  opacity: 0.75;
}

.row dt {
  font-weight: var(--font-weight-medium);
  min-width: 64px;
}

.row dd {
  font-weight: var(--font-weight-light);
}
</style>
