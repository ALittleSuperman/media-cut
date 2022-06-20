<template>
<div id="wapper">
  <div class="main">
    <div class="videoContainer">
      <video id="videoPlayer" class="video-js"/>
    </div>
    <div class="media-cut">
      <div class="fpsGroup">
        <div class="container" id="container">
          <div class="resize left">
            <i></i>
            <i></i>
          </div>
          <div class="resize right">
            <i></i>
            <i></i>
          </div>
        </div>
        <div class="group" :style="{left: positionX + 'vw'}">
          <img class="imagesFps" v-for="item in 47" :key="item" :src="getImg(item)" >
        </div>
      </div>
      <div class="control">
        <input type="range" id="sliderBar" @input="sliderInput" @change="sliderChange" value="0"/>
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
      positionX: 0, // 帧图偏移的位置
      clientX: 0, // 鼠标按下的坐标
      direc: null, // 鼠标按下的位置
      wapperContainer: null,
      CContainer: null
    }
  },
  computed: {
    /**
     * 最小宽度
     * @returns {number}
     */
    minWidth: () => {
      return document.body.clientWidth / 10
    },
    /**
     *  最大宽度
     */
    maxWidth: () => {
      return document.querySelector('.fpsGroup').clientWidth
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
    /**
     * 初始化事件监听
     */
    initEvent () {
      this.wapperContainer = document.getElementById('wapper')
      this.CContainer = document.getElementById('container')
      this.wapperContainer.addEventListener('mousemove', this.move)
      this.wapperContainer.addEventListener('mouseup', this.up)
      this.CContainer.addEventListener('mousedown', this.down)
    },
    /**
     * 滑块滑动事件
     * @param val
     */
    sliderChange (event) {
      const m = event.target.value / 100
      this.starTime = this.duration * m / 1000
      this.player.currentTime(this.starTime)
    },
    /**
     * 滑块改变
     */
    sliderInput (event) {
      const time = event.target.value / 100 * this.duration / 1000 * 10
      this.positionX = -time
    },
    /**
     * body鼠标移动事件
     */
    move (e) {
      if (this.direc === null) return
      if (this.direc.includes('right')) {
        console.log(this.clientX, '元素起始坐标位置')
        console.log(e.clientX, '当前鼠标坐标位置')
        console.log(this.CContainer.clientWidth, '当前元素宽度')
        console.log(e.clientX - this.clientX, '计算过后的差值')
        console.log(this.CContainer.clientWidth + e.clientX - this.clientX, '计算过后的元素的宽度')
        const num = Math.max(this.minWidth, this.CContainer.clientWidth + e.clientX - this.clientX)
        this.CContainer.style.width = num > this.maxWidth ? this.maxWidth + 'px' : num + 'px'
        this.clientX = e.clientX
      } else if (this.direc.includes('right')) {
        console.log(123)
      }
    },
    /**
     * 鼠标按下时开启尺寸修改
     */
    down (e) {
      this.getDirection(e)
      if (this.direc === null) return
      this.clientX = e.clientX
    },
    /**
     * 获取鼠标点击的div
     * @param ev
     */
    getDirection (ev) {
      if (ev.target.className.includes('left')) {
        this.direc = 'left'
      } else if (ev.target.className.includes('right')) {
        this.direc = 'right'
      } else {
        this.direc = null
      }
    },
    /**
     * 鼠标提起时
     */
    up () {
      this.direc = null
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
    width: 70%;
    height: 100%;
    margin: auto;
    overflow: hidden;
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
        height: 100px;
        position: relative;
        .container {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          border: 2px solid black;
          box-sizing: border-box;
          border: 2px solid #409EFF;
          display: flex;
          justify-content: space-between;
          .resize {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10px;
            height: 100%;
            border-radius: 10px;
            background-color: white;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, .35);
            cursor: col-resize;
          }
          .resize i {
            display: inline-block;
            height: 14px;
            width: 1px;
            background-color: #E9E9E9;
            margin: 0 1px;
          }
          .left {
          }
        }
        .group {
          position: absolute;
          height: 100%;
          width: auto;
          display: flex;
          flex-wrap: nowrap;
          z-index: 1;
          .imagesFps {
            height: 100%;
            width: 10vw;
          }
        }
      }
      .control {
        margin-top: 15px;
        height: 30%;
        position: relative;
        #sliderBar {
          width: 100%;
          height: 100%;
          appearance: none;
          background: none;
          outline: none;
        }
        #sliderBar::-webkit-slider-runnable-track {
          appearance: none;
          width: 100%;
          height: 100%;
          background-color: #F2F6FC;
          cursor: pointer;
          border-radius: 5px;
          padding-right: 2px;
        }
        #sliderBar::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          border-radius: 5px;
          height: 100%;
          background-color: #A0CFFF;
        }
        #sliderBar::-webkit-slider-thumb:active {
          background-color: #409EFF;
        }
      }
    }
  }
</style>
