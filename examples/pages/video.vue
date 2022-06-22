<template>
<div id="wapper">
  <div class="main">
    <div class="videoContainer">
      <video id="videoPlayer" class="video-js"/>
    </div>
    <div class="media-cut">
      <div class="fpsGroup">
        <div class="container">
          <div class="resize left">
            <i></i>
            <i></i>
          </div>
          <div class="view"></div>
          <div class="resize right">
            <i></i>
            <i></i>
          </div>
        </div>
        <div class="group">
          <img class="imagesFps" v-for="item in 47" width="200px" :key="item" :src="getImg(item)" draggable="false">
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'videoPage',
  mounted () {
    this.initPlay()
    this.initEvent()
  },
  destroyed () {
    this.player.dispose()
  },
  data () {
    return {
      player: null, // video.js实例
      duration: 0, // 视频的总时长
      starTime: 0, // 视频的播放开始时间
      endTime: 0, // 视频的播放结束时间
      time: 7, // 视频的播放时长
      target: null, // 鼠标按下的位置
      minWidth: 213, // 最小宽度
      initX: 0, // 鼠标点击时初始位置
      speed: 1 // 帧图移动速度
    }
  },
  methods: {
    /**
     * 渲染帧图
     * @param key
     * @returns {*}
     */
    getImg (key) {
      return require(`../assets/${key}.png`)
    },
    /**
     * 初始化videojs
     */
    initPlay () {
      this.player = this.$videojs(document.querySelector('#videoPlayer'), {
        controls: true,
        autoplay: false,
        preload: 'metadata',
        controlBar: {
          fullscreenToggle: false, // 全屏展示关闭
          volumePanel: false, // 音量关闭
          playToggle: false, // 播放暂停按钮关闭
          progressControl: false, // 关闭进度条
          remainingTimeDisplay: false, // 播放时长关闭
          pictureInPictureToggle: false // 隐藏画中画按钮
        },
        sources: [{
          src: 'https://blog-1301169927.cos.ap-beijing.myqcloud.com/oceans.mp4',
          type: 'video/mp4'
        }]
      }, () => {
        /**
         * 监听视频加载完成获取视频总时长(毫秒数)
         */
        this.player.on('loadedmetadata', () => {
          this.duration = this.player.duration() * 1000
        })
        /**
         * 到达结束时间时暂停
         */
        this.player.on('timeupdate', () => {
          const currentTime = this.player.currentTime()
          this.endTime = this.starTime + 7
          if (currentTime >= this.endTime) {
            this.player.currentTime(this.starTime)
            this.player.pause()
          }
        })
      })
    },
    initEvent () {
      document.querySelector('body').addEventListener('mousemove', this.move)
      document.querySelector('.container').addEventListener('mousedown', this.down)
      document.querySelector('body').addEventListener('mouseup', this.up)
    },
    /**
     * body代理鼠标滑动实践
     */
    move (event) {
      const target = document.querySelector('.view')
      if (this.target === 2) {
        if (this.judgeDirection(event)) {
          if (target.clientWidth < 426) {
            this.rightControlToRightWidth(event)
          }
        } else {
          if (target.clientWidth > 213) {
            this.rightControlToLeftWidth(event)
          } else {
            this.rightControlToLeftLeft(event)
          }
        }
      } else if (this.target === 1) {
        if (this.judgeDirection(event)) {
          if (target.clientWidth > 213) {
            this.leftControlToRightWidth(event)
          } else {
            this.leftControlToRightLeft(event)
          }
        } else {
          if (target.clientWidth < 426) {
            this.leftControlToLeftWidth(event)
          }
        }
      } else if (this.target === 3) {
        if (this.judgeDirection(event)) {
          this.leftControlToRightLeft(event)
        } else {
          this.leftControlToRightLeft(event)
        }
      }
    },
    /**
     * 右侧控制器向右宽度改变
     * @param e
     */
    rightControlToRightWidth (event) {
      const target = document.querySelector('.view')
      const width = target.clientWidth + (event.clientX - this.initX)
      target.style.width = width > 426 ? 426 : width + 'px'
      this.initX = event.clientX
    },
    /**
     * 右侧控制器向左宽度改变
     * @param e
     */
    rightControlToLeftWidth (event) {
      const target = document.querySelector('.view')
      const width = target.clientWidth + (event.clientX - this.initX)
      target.style.width = width < 213 ? 213 : width + 'px'
      this.initX = event.clientX
    },
    /**
     * 右侧控制器向左偏移度改变
     * @param event
     */
    rightControlToLeftLeft (event) {
      const target = document.querySelector('.container')
      if (target.offsetLeft === 0) return
      const left = target.offsetLeft - Math.abs(event.clientX - this.initX)
      target.style.left = left <= 0 ? 0 : left + 'px'
      this.initX = event.clientX
    },
    /**
     * 左侧控制器宽度向右改变
     * @param e
     */
    leftControlToRightWidth (event) {
      const target = document.querySelector('.view')
      const width = target.clientWidth - (event.clientX - this.initX)
      target.style.width = width <= 213 ? 213 : width + 'px'
      this.leftControlToRightLeft(event)
    },
    /**
     * 左侧控制器向左宽度改变
     * @param e
     */
    leftControlToLeftWidth (event) {
      const target = document.querySelector('.view')
      const width = target.clientWidth + Math.abs(event.clientX - this.initX)
      target.style.width = width >= 426 ? 426 : width + 'px'
      if (width >= 426) return
      this.leftControlToRightLeft(event)
    },
    /**
     * 左侧控制器偏移度改变
     * @param e
     */
    leftControlToRightLeft (event) {
      const container = document.querySelector('.container')
      const wrapper = document.querySelector('.fpsGroup')
      const control = document.querySelector('.left')
      const maxLeft = wrapper.clientWidth - container.clientWidth + (control.clientWidth * 2)
      const left = container.offsetLeft + (event.clientX - this.initX)
      if (left <= 0) {
        container.style.left = 0 + 'px'
        this.initX = event.clientX
      } else if (left >= maxLeft) {
        container.style.left = maxLeft + 'px'
        this.initX = event.clientX
      } else {
        container.style.left = left + 'px'
        this.initX = event.clientX
      }
    },
    /**
     * 判断方向
     * @param e
     * 向右为true 向左为false
     * @return Boolean
     */
    judgeDirection (e) {
      return e.clientX - this.initX > 0
    },
    /**
     * 移动帧图偏移度
     * @param event
     */
    moveImages (event) {
      const container = document.querySelector('.group')
      const target = document.querySelector('.container')
      if (this.speed < 5) {
        setTimeout(() => {
          if (this.judgeDirection(event)) {
            const long = container.offsetLeft + 1
            const max = container.clientWidth - target.clientWidth
            container.style.left = long >= max ? max : long + 'px'
          } else {
            const long = container.offsetLeft - 1
            container.style.left = long <= 0 ? 0 : long + 'px'
          }
        }, 300)
      } else {
        setTimeout(() => {
          if (this.judgeDirection(event)) {
            const long = container.offsetLeft - 1
            const max = container.clientWidth - target.clientWidth
            console.log(long, max)
            container.style.left = Math.abs(long) >= max ? -max : long + 'px'
          } else {
            const long = container.offsetLeft + 1
            container.style.left = long <= 0 ? 0 : long + 'px'
          }
        }, 100)
      }
    },
    /**
     * 鼠标按下
     * @param e
     */
    down (e) {
      this.initX = e.clientX
      if (e.target.className.includes('left')) {
        this.target = 1
      } else if (e.target.className.includes('right')) {
        this.target = 2
      } else if (e.target.className.includes('view')) {
        this.target = 3
      }
    },
    /**
     * 鼠标提起时
     */
    up () {
      this.target = null
    }
  }
}
</script>
<style scoped lang="scss">
#wapper {
  width: 100vw;
  height: 100vh;
}
  .main {
    width: 1065px;
    height: 100%;
    margin: auto;
    box-sizing: border-box;
    .videoContainer::v-deep {
      height: 60%;
      margin-top: 20px;
      width: 100%;
      box-sizing: border-box;
      .video-js {
        width: 100%;
        height: 100%;
      }
      .vjs-big-play-button {
        left: 50%;
        top: 50%;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .vjs-paused .vjs-big-play-button,
      .vjs-paused.vjs-has-started .vjs-big-play-button {
        display: block !important;
      }
    }
    .media-cut {
      width: 100%;
      height: 150px;
      box-sizing: border-box;
      margin-top: 20px;
      .control {
        width: 100%;
        box-sizing: border-box;
      }
      .fpsGroup {
        height: 120px;
        position: relative;
        width: 1065px;
        .group {
          position: absolute;
          z-index: 1;
          display: flex;
          height: 120px;
          .imagesFps {
            width: 213px;
            height: 120px;
          }
        }
        .container {
          width: auto;
          height: 100%;
          position: absolute;
          display: flex;
          justify-content: space-between;
          transform: translateX(-15px);
          z-index: 2;
          left: 213px;
          .view {
            width: 213px;
            min-width: 213px;
            max-width: 426px;
          }
          .resize {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 15px;
            height: 100%;
            background-color: white;
            cursor: col-resize;
          }
          .left {
            left: 0px;
          }
          .right {
            right: 0px;
          }
          .resize i {
            display: inline-block;
            height: 14px;
            width: 1px;
            background-color: #E9E9E9;
            margin: 0 1px;
          }
        }
      }
    }
  }
</style>
