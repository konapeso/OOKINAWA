export default class FramesPerSecond {
  constructor (fps = 10) {
    this.framerate = 1000 / fps
    this.currentTime = Date.now()
  }

  check () {
    const now = Date.now()
    const elapsed = now - this.currentTime
    if (elapsed > this.framerate) {
      this.currentTime = now - (elapsed % this.framerate)
      return true
    }
    return false
  }

  change (fps) {
    this.framerate = 1000 / fps
  }
}
