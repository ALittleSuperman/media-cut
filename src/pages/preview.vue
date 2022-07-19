<template>
  <div class="app">
    <VideoPreview v-for="n in 32" :key="n"/>
  </div>
</template>

<script>
import VideoPreview from '../components/video-preview'
export default {
  name: 'previewVideo',
  components: {
    VideoPreview
  },
  mounted () {
    this.initEvent()
  },
  methods: {
    initEvent () {
      document.querySelector('body').addEventListener('mousemove', this.move)
    },
    move (e) {
      // console.log(e.target)
      const isMask = e.target.className.includes('mask')
      if (isMask) {
        this.setLineWidth(e.target, e.offsetX)
        this.setMaskBG(e.target, e.offsetX)
      }
    },
    setLineWidth (mask, offsetX) {
      const top = mask.parentElement.querySelector('.top')
      top.style.width = offsetX * 196 / 200 + 'px'
    },
    setMaskBG (mask, offsetX) {
      const width = -(Math.floor(offsetX / (200 / 30)) * 200) + 'px'
      // mask.style.backgroundPositionX = width
      const dom = mask.parentElement.querySelector('.imgs')
      dom.style.left = width
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  background-color: #909399;
  padding: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
