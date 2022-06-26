<template>
  <div class="media_cut_container" ref="container">
    <div class="fpsControlContainer">
      <div class="fpsImgGroup">
        <img v-for="item in fps" :src="item" :key="item" class="fpsImg" />
      </div>
    </div>
    <div class="controlContainer" ref="controlContainer">
      <div class="control left" id="left">
        <div class="containerContent" />
      </div>
      <div class="view" id="view" ref="view"></div>
      <div class="control right" id="right">
        <div class="containerContent"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MediaCut',
  props: {
    fps: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      maxWidth: 0, // 截帧容器的最大宽度
      initMouseX: 0, // 鼠标点击时的X坐标
      target: null, // 移动的目标元素
      initViewWidth: 0, // 截帧容器的初始宽度
      initContainerLeft: 0, // 操作容器的初始左偏移度
      maxLeft: 0, // 操作容器的最大左偏移度
      thisX: 0 // 鼠标移动时的X坐标
    }
  },
  mounted () {
    this.maxWidth = this.$refs.container.offsetWidth / 2
    this.initEvent()
  },
  methods: {
    /**
     * 初始化事件
     */
    initEvent () {
      document.querySelector('body').addEventListener('mousemove', this.mousemove)
      document.querySelector('#left').addEventListener('mousedown', (e) => {
        this.target = 1
        this.initMouseX = e.clientX
        this.initViewWidth = this.$refs.view.offsetWidth
        this.initContainerLeft = this.$refs.controlContainer.offsetLeft
        this.maxLeft = this.$refs.container.offsetWidth - (this.$refs.controlContainer.offsetWidth)
      })
      document.querySelector('#right').addEventListener('mousedown', (e) => {
        this.target = 2
        this.initMouseX = e.clientX
        this.initViewWidth = this.$refs.view.offsetWidth
        this.initContainerLeft = this.$refs.controlContainer.offsetLeft
        this.maxLeft = this.$refs.container.offsetWidth - (this.$refs.controlContainer.offsetWidth)
      })
      document.querySelector('#view').addEventListener('mousedown', (e) => {
        this.target = 3
        this.initMouseX = e.clientX
        this.initViewWidth = this.$refs.view.offsetWidth
        this.initContainerLeft = this.$refs.controlContainer.offsetLeft
        this.maxLeft = this.$refs.container.offsetWidth - (this.$refs.controlContainer.offsetWidth)
      })
      document.querySelector('body').addEventListener('mouseup', () => {
        this.target = null
      })
    },
    /**
     * 鼠标移动事件
     * @param e
     */
    mousemove (event) {
      if (this.target === 1) {
        this.handleLeft(event)
      }
    },
    direction (event) {
      return event.clientX - this.initMouseX > 0
    },
    /**
     * 点击左边控制器
     */
    handleLeft (event) {
      const poor = event.clientX - this.initMouseX
      this.changeControlLeft(event)
      if (this.direction(event)) {
        if (this.initViewWidth - poor > 100) {
          this.$refs.view.style.width = `${this.initViewWidth - poor}px`
        }
      } else {
        if (this.initViewWidth + Math.abs(poor) > this.maxWidth || this.initContainerLeft === 0) return
        this.$refs.view.style.width = `${this.initViewWidth + Math.abs(poor)}px`
      }
    },
    /**
     * 控制操作容器偏移度
     */
    changeControlLeft (event) {
      const poor = event.clientX - this.initMouseX
      if (this.initContainerLeft + poor < 0 || this.initContainerLeft + poor > this.maxLeft) return
      this.$refs.controlContainer.style.left = `${this.initContainerLeft + poor}px`
    }
  }
}
</script>
<style lang="scss" scoped>
.media_cut_container {
  width: 100%;
  height: 100%;
  position: relative;
  .fpsControlContainer {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .fpsImgGroup {
      width: auto;
      height: 100%;
      display: flex;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 5;
      .fpsImg {
        height: 100%;
      }
    }
  }
  .controlContainer {
    width: auto;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 6;
    display: flex;
    border: 4px solid #065fd4;
    border-left: none;
    border-right: none;
    box-sizing: border-box;
    .view {
      height: 100%;
      width: 100px;
      cursor: grab;
    }
    .control {
      position: absolute;
      border-right: none;
      cursor: ew-resize;
      display: flex;
      align-items: center;
      justify-content: center;
      .containerContent {
        width: 4px;
        height: 80%;
        background-color: #FFFFFF;
        border-radius: 4px;
      }
    }
    .left {
      position: absolute;
      top: -4px;
      bottom: -4px;
      width: 16px;
      border-top: none;
      border-bottom: none;
      background-color: #065fd4;
      border-radius: 4px 0px 0px 4px;
      left: -16px;
    }
    .right {
      position: absolute;
      top: -4px;
      bottom: -4px;
      width: 16px;
      border-top: none;
      border-bottom: none;
      background-color: #065fd4;
      right: -16px;
      border-radius: 0px 4px 4px 0px;
    }
  }
}
</style>
