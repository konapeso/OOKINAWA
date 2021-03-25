const debounce = (fn, ms = 500) => {
  let timeout = 0
  return (...args) =>
    new Promise((resolve) => {
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => resolve(fn(...args)), ms)
    })
}

export default debounce
