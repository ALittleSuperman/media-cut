<template>
<div id="wapper">
  <div class="main">
    <div class="videoContainer">
      <video id="videoPlayer" class="video-js"/>
    </div>
    <div class="media-cut">
      <MediaCut :fps="fps" />
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'videoPage',
  destroyed () {
    this.player.dispose()
  },
  data () {
    const fps = new Array(30).fill('').map((item, index) => {
      return this.getImg(index + 1)
    })
    return {
      player: null, // video.js实例
      duration: 0, // 视频的总时长
      starTime: 0, // 视频的播放开始时间
      endTime: 0, // 视频的播放结束时间
      time: 7, // 视频的播放时长
      fps // 视频的帧率数组
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
    }
  }
}
</script>
<style scoped lang="scss">
#wapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
      height: 60px;
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
