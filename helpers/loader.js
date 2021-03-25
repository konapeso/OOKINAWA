import { on } from '@/helpers/event'

const imageLoader = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    on(img, 'load', () => resolve(img))
    on(img, 'error', () => resolve(img))
    img.src = src
  })
}

const videoLoader = (video) => {
  return new Promise((resolve) => {
    on(video, 'canplaythrough', () => resolve(video))
  })
}

export { imageLoader, videoLoader }
