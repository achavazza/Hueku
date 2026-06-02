export function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function rgbToXyz(r, g, b) {
  let rn = r / 255
  let gn = g / 255
  let bn = b / 255

  rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92
  gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92
  bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92

  return {
    x: (rn * 0.4124 + gn * 0.3576 + bn * 0.1805) * 100,
    y: (rn * 0.2126 + gn * 0.7152 + bn * 0.0722) * 100,
    z: (rn * 0.0193 + gn * 0.1192 + bn * 0.9505) * 100,
  }
}

function xyzToLab(x, y, z) {
  const xn = 95.047
  const yn = 100.0
  const zn = 108.883

  let fx = x / xn
  let fy = y / yn
  let fz = z / zn

  fx = fx > 0.008856 ? Math.pow(fx, 1 / 3) : 7.787 * fx + 16 / 116
  fy = fy > 0.008856 ? Math.pow(fy, 1 / 3) : 7.787 * fy + 16 / 116
  fz = fz > 0.008856 ? Math.pow(fz, 1 / 3) : 7.787 * fz + 16 / 116

  return {
    l: Math.round(116 * fy - 16),
    a: Math.round(500 * (fx - fy)),
    b: Math.round(200 * (fy - fz)),
  }
}

export function rgbToLab(r, g, b) {
  const xyz = rgbToXyz(r, g, b)
  return xyzToLab(xyz.x, xyz.y, xyz.z)
}

export function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function getContrastTextColor(r, g, b) {
  return getLuminance(r, g, b) > 0.4 ? '#1a1a1a' : '#f0f0f0'
}
