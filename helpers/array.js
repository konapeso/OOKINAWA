import { isArray } from '@/helpers/is'

/**
 * 配列からランダムに要素を返す
 */
const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 配列から重複をなくす
 */
const unique = (arr) => {
  return arr.filter((val, i, arr) => arr.indexOf(val) === i)
}

/**
 * 配列内数値から平均を割り出す
 */
const average = (...num) => {
  return num.reduce((acc, val) => acc + val, 0) / num.length
}

/**
 * 配列を並列化
 */
const flatten = (arr, depth = 1) => {
  return depth !== 1
    ? arr.reduce((a, v) => a.concat(isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), [])
}

/**
 * Fisher Yates algorithm
 */
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export { sample, unique, average, flatten, shuffle }
