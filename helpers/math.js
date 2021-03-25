const PI = Math.PI
const TAU = 2 * PI
const HALF_PI = PI / 2

/**
 * 乱数を作成
 * @param {?number} min
 * @param {?number} max
 * @return {number}
 */
const random = (min, max) => {
  if (!min) {
    return Math.random()
  }
  if (!max) {
    return Math.random() * min
  }
  return Math.random() * (max - min) + min
}

/**
 * 値を範囲内に収める
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const clamp = (val, min, max) => {
  return Math.min(Math.max(min, val), max)
}

/**
 * 値の正規化
 * @param {number} val
 * @param {number} min
 * @param {number} max
 */
const norm = (val, min, max) => {
  return (val - min) / (max - min)
}

/**
 * 値の線形補間
 * @example lerp(0, 100, 0.5) -> 50
 * @param  {number} start
 * @param  {number} end
 * @param  {number} amount
 * @return {number}
 */
const lerp = (start, end, amount) => {
  return start * (1 - amount) + end * amount
}

/**
 * 値の範囲変換
 * @example map(50, -100, 100, 0, 1) -> 0.75
 * @param  {number} val
 * @param  {number} fromMin
 * @param  {number} fromMax
 * @param  {number} toMin
 * @param  {number} toMax
 * @return {number}
 */
const map = (val, fromMin, fromMax, toMin, toMax, withinBounds = true) => {
  const v = lerp(toMin, toMax, norm(val, fromMin, fromMax))

  if (!withinBounds) {
    return v
  }

  if (toMin < toMax) {
    return clamp(v, toMin, toMax)
  } else {
    return clamp(v, toMax, toMin)
  }
}

/**
 * 値を範囲内に収める
 * @param {number} index
 * @param {number} length
 * @return {number}
 */
const normalizeIndex = (index, length) => {
  return (length + (index % length)) % length
}

/**
 * 角度をラジアンに変換
 * @param  {number} deg
 * @return {number}
 */
const degreesToRads = (deg) => {
  return (deg * PI) / 180
}

/**
 * ラジアンを角度に変換
 * @param  {number} rad
 * @return {number}
 */
const radsToDegrees = (rad) => {
  return (rad * 180.0) / PI
}

const fixed = (num, digit = 2) => {
  const n = Math.pow(10, digit)
  return ~~(num * n) / n
}

export {
  PI,
  TAU,
  HALF_PI,
  random,
  clamp,
  norm,
  lerp,
  map,
  normalizeIndex,
  degreesToRads,
  radsToDegrees,
  fixed
}
