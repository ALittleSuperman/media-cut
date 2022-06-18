<template>
  <div class="main">
    <div class="videoContainer">
      <video id="videoPlayer" class="video-js"/>
    </div>
    <div class="media-cut">
      <div class="fpsGroup"></div>
      <div class="control">
        <input type="range" id="sliderBar" @change="sliderChange" value="0"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'videoPage',
  mounted () {
    this.init()
  },
  destroyed () {
    this.player.dispose()
  },
  data () {
    return {
      player: null,
      duration: 0,
      starTime: 0,
      endTime: 0,
      time: 7
    }
  },
  methods: {
    /**
     * 初始化videojs
     */
    init () {
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
          const duration = this.player.duration()
          this.duration = this.player.duration() * 1000
          this.endTime = duration
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
     * 滑块滑动事件
     * @param val
     */
    sliderChange (event) {
      const m = event.target.value / 100
      this.starTime = this.duration * m / 1000
      this.player.currentTime(this.starTime)
    }
  }
}
</script>
<style scoped lang="scss">
  .main {
    width: 60%;
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
      .fpsGroup, .control {
        width: 100%;
        box-sizing: border-box;
      }
      .fpsGroup {
        height: 60%;
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
