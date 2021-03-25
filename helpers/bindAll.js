const bindAll = (ctx, ...args) => {
  ;[...args].forEach((eventName) => {
    ctx[eventName] = ctx[eventName].bind(ctx)
  })
}

export default bindAll
