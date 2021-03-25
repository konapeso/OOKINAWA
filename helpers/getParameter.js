const getParameters = (path = location.search) => {
  if (!path) {
    return new Map()
  }

  return decodeURIComponent(path)
    .match(/([^?=&]+)(=([^&]*))?/g)
    .reduce((acc, val) => {
      ;[...val].includes('=')
        ? acc.set(
          val.slice(0, val.indexOf('=')),
          val.slice(val.indexOf('=') + 1)
        )
        : acc.set(val, '')
      return acc
    }, new Map())
}

export default getParameters
