import { imageLoader } from '@/helpers/loader'

const preloadImages = (paths = []) => {
  return Promise.all(
    paths.map(async (path) => {
      await imageLoader(path)
    })
  )
}

export default preloadImages
