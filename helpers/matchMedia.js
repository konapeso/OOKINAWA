/**
 * @see https://github.com/Polymer/pwa-helpers/blob/5cb02bacb6c6f72ceafeb1345de669e9986fcf70/src/media-query.ts
 * @example
 *  matchMedia('(min-width: 600px)', (matches) => {
 *    console.log(matches ? 'wide screen' : 'narrow sreen')
 *  })
 */
const matchMedia = (mediaQuery, fn) => {
  const mq = window.matchMedia(mediaQuery)
  mq.addListener(e => fn(e.matches))
  fn(mq.matches)
}

export default matchMedia
