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
        <div class="row" @click="copyValue('HEX')">
          <dt>HEX</dt>
          <dd :class="{ 'is-copied': copied === 'HEX' }">{{ color.hex }}</dd>
        </div>
        <div class="row" @click="copyValue('RGB')">
          <dt>RGB</dt>
          <dd :class="{ 'is-copied': copied === 'RGB' }">{{ color.rgb.join(', ') }}</dd>
        </div>
        <div class="row" @click="copyValue('HSL')">
          <dt>HSL</dt>
          <dd :class="{ 'is-copied': copied === 'HSL' }">{{ color.hsl.h }}° {{ color.hsl.s }}% {{ color.hsl.l }}%</dd>
        </div>
        <div class="row" @click="copyValue('LAB')">
          <dt>LAB</dt>
          <dd :class="{ 'is-copied': copied === 'LAB' }">{{ color.lab.l }} {{ color.lab.a }} {{ color.lab.b }}</dd>
        </div>
        <div class="row" @click="copyValue('CMYK')">
          <dt>CMYK</dt>
          <dd :class="{ 'is-copied': copied === 'CMYK' }">{{ cmyk.join(', ') }}</dd>
        </div>
        <div class="row" @click="copyValue('WADA')">
          <dt>WADA ID</dt>
          <dd :class="{ 'is-copied': copied === 'WADA' }">{{ color.id }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getContrastTextColor, rgbToCmyk } from '../utils/color'

const props = defineProps({
  color: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const copied = ref(null)

const textColor = computed(() =>
  getContrastTextColor(props.color.rgb[0], props.color.rgb[1], props.color.rgb[2]),
)

const cmyk = computed(() =>
  rgbToCmyk(props.color.rgb[0], props.color.rgb[1], props.color.rgb[2]),
)

function goBack() {
  router.push({ name: 'home' })
}

function copyValue(type) {
  const c = props.color
  const map = {
    HEX: c.hex,
    RGB: 'rgb(' + c.rgb.join(', ') + ')',
    HSL: 'hsl(' + c.hsl.h + '\u00B0 ' + c.hsl.s + '% ' + c.hsl.l + '%)',
    LAB: 'lab(' + c.lab.l + ' ' + c.lab.a + ' ' + c.lab.b + ')',
    CMYK: 'cmyk(' + cmyk.value.join(', ') + ')',
    WADA: String(c.id),
  }
  navigator.clipboard.writeText(map[type])
  copied.value = type
  setTimeout(() => { copied.value = null }, 1000)
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
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.row:hover {
  opacity: 1;
}

.row dt {
  font-weight: var(--font-weight-medium);
  min-width: 64px;
}

.row dd {
  font-weight: var(--font-weight-light);
  transition: opacity var(--transition-fast);
}

.row dd.is-copied {
  opacity: 0.5;
}
</style>
