<template>
  <div class="media_cut_container" ref="container">
    <div class="fpsControlContainer">
      <div class="fpsImgGroup" ref="fps">
        <img v-for="item in fpsTime" :src="getUrl(pictrue, item)" :key="item" class="fpsImg" :width="imgWidth" />
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
    fpsTime: {
      type: Array,
      default: () => []
    },
    pictrue: {
      type: String,
      default: ''
    },
    getUrl: {
      type: Function,
      default: () => {}
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imgWidth: 0,
      maxWidth: 0, // 截帧容器的最大宽度
      minWidth: 0, // 截帧容器的最大宽度
      initMouseX: 0, // 鼠标点击时的X坐标
      target: null, // 移动的目标元素
      initViewWidth: 0, // 截帧容器的初始宽度
      initContainerLeft: 0, // 操作容器的初始左偏移度
      maxLeft: 0, // 操作容器的最大左偏移度
      thisX: 0, // 鼠标移动时的X坐标
      timer: null
    }
  },
  mounted () {
    this.imgWidthCalc()
    const d = Math.floor(this.duration / 1000) > 60
    if (d) {
      this.maxWidth = this.$refs.container.offsetWidth / 2
    } else {
      this.maxWidth = this.$refs.container.offsetWidth
    }
    this.initEvent()
  },
  methods: {
    imgWidthCalc () {
      const d = Math.floor(this.duration / 1000) > 60
      if (d) {
        this.imgWidth = this.$refs.container.offsetWidth / 30
        this.minWidth = Math.floor(this.imgWidth * 0.66)
      } else {
        this.imgWidth = this.$refs.container.offsetWidth / Math.floor(this.duration / 1000)
      }
    },
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
      })
      document.querySelector('#view').addEventListener('mousedown', (e) => {
        this.target = 3
        this.initMouseX = e.clientX
        this.initContainerLeft = this.$refs.controlContainer.offsetLeft
        this.maxLeft = this.$refs.container.offsetWidth - (this.$refs.controlContainer.offsetWidth)
      })
      document.querySelector('body').addEventListener('mouseup', () => {
        this.target = null
        clearInterval(this.timer)
      })
    },
    /**
     * 鼠标移动事件
     * @param e
     */
    mousemove (event) {
      if (this.target === 1) {
        this.changeControlLeft(event)
        this.handleLeft(event)
      } else if (this.target === 2) {
        this.handleRight(event)
      } else if (this.target === 3) {
        this.handleView(event)
      }
    },
    direction (event) {
      return event.clientX - this.initMouseX > 0
    },
    /**
     * 点击左边控制器
     */
    handleLeft (event) {
      if (this.$refs.controlContainer.offsetLeft === 0) return
      const poor = this.initViewWidth - (event.clientX - this.initMouseX)
      const width = poor > this.maxWidth ? this.maxWidth : poor < this.minWidth ? this.minWidth : poor
      this.$refs.view.style.width = `${width}px`
    },
    /**
     * 控制操作容器偏移度
     */
    changeControlLeft (event) {
      const poor = event.clientX - this.initMouseX
      const n = this.initContainerLeft + poor
      const left = n < 0 ? 0 : n > this.maxLeft ? this.maxLeft : n
      if (!(this.$refs.view.offsetWidth === this.maxWidth || this.$refs.view.offsetWidth === this.minWidth)) {
        this.$refs.controlContainer.style.left = left + 'px'
      }
    },
    /**
     * 拖动右边控制器
     */
    handleRight (event) {
      const poor = this.initViewWidth + (event.clientX - this.initMouseX)
      const width = poor > this.maxWidth ? this.maxWidth : poor < this.minWidth ? this.minWidth : poor
      this.$refs.view.style.width = `${width}px`
    },
    /**
     * 拖动中间控制器
     */
    handleView (event) {
      const poor = event.clientX - this.initMouseX
      const n = this.initContainerLeft + poor
      this.handleFps(event)
      let left = 0
      if (n < 0) {
        left = 0
      } else if (n > this.maxLeft) {
        left = this.maxLeft
        console.log(this.maxLeft)
      } else {
        left = n
      }
      this.$refs.controlContainer.style.left = left + 'px'
    },
    /**
     * 改变帧图位置
     */
    handleFps (event) {
      const poor = event.clientX - this.initMouseX
      this.timer = setInterval(() => {
        if (this.$refs.controlContainer.offsetLeft === 0 || this.$refs.controlContainer.offsetLeft === this.maxLeft) {
          if (poor >= 0) {
            const n = this.$refs.fps.offsetLeft - 1
            this.$refs.fps.style.left = n + 'px'
          } else if (poor < 0) {
            this.$refs.fps.style.left = this.$refs.fps.offsetLeft + 1 + 'px'
          }
        }
      }, 50)
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
