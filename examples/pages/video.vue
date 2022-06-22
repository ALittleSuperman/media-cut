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
      minWidth: 213,
      clientWidth: 0,
      clientX: 0,
      initWidth: 0,
      initLeft: 0
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
      const container = document.querySelector('.container')
      if (this.target === 1) {
        // 点击左边控制器
        const client = event.clientX - this.clientX
        if (client >= 0) {
          // 向右拖拽
          if (this.initWidth > 213) {
            const width = this.initWidth - (event.clientX - this.clientX)
            target.style.width = width + 'px'
            const left = this.initLeft + (event.clientX - this.clientX)
            container.style.left = left + 'px'
          }
        }
      } else if (this.target === 2) {
        // 点击右边的控制器
        const client = event.clientX - this.clientX
        if (client >= 0) {
          // 如果向右拖动
          if (target.clientWidth < 426 && target.clientWidth >= 213) {
            // 向右拖动时宽度未到达最大值，更改宽度
            const n = event.clientX - this.clientX + this.initWidth
            const width = Math.min(426, n) < 213 ? 213 : Math.min(426, n)
            if (width === 426) {
              // 已经到达最大值更新鼠标初始化位置
              this.clientX = event.clientX
              this.initWidth = 426
            }
            target.style.width = width + 'px'
          }
        } else {
          // 如果向左拖动
          if (target.clientWidth <= 426 && target.clientWidth > 213) {
            // 向左拖动未到达最小值，更新宽度
            const n = this.initWidth - Math.abs(client)
            const width = Math.max(213, n) === 213 ? 213 : Math.max(213, n)
            if (width === 213) {
              // 如果已经到达最小值，更新鼠标位置
              this.clientX = event.clientX
              this.initWidth = 213
            }
            target.style.width = width + 'px'
          }
        }
      }
    },
    /**
     * 鼠标按下
     * @param e
     */
    down (e) {
      const container = document.querySelector('.container')
      const target = document.querySelector('.view')
      this.clientX = e.clientX
      this.initWidth = target.getBoundingClientRect().width
      this.initLeft = container.offsetLeft
      if (e.target.className.includes('left')) {
        this.target = 1
      } else if (e.target.className.includes('right')) {
        this.target = 2
      }
    },
    /**
     * 鼠标提起时
     */
    up (e) {
      const container = document.querySelector('.container')
      const target = document.querySelector('.view')
      this.clientX = e.clientX
      this.initWidth = target.getBoundingClientRect().width
      this.initLeft = container.offsetLeft
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
