<template>
<div id="wapper">
  <div class="main">
    <div class="videoContainer">
      <video id="videoPlayer" class="video-js"/>
    </div>
    <div class="media-cut">
      <MediaCut :pictrue="pictrue" :fpsTime="fps" :getUrl="getUrl" :duration="duration"/>
    </div>
  </div>
</div>
</template>
<script>
import { getUrl } from './video'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import MediaCut from '../components/cut/index'
export default {
  name: 'videoPage',
  destroyed () {
    this.player.dispose()
  },
  component: {
    MediaCut
  },
  data () {
    const fps = []
    for (let i = 0; i <= 334240; i++) {
      if (i % 1500 === 0) {
        fps.push(i)
      }
    }
    return {
      player: null, // video.js实例
      duration: 334240, // 视频的总时长
      starTime: 0, // 视频的播放开始时间
      endTime: 0, // 视频的播放结束时间
      time: 7, // 视频的播放时长
      fps, // 视频的帧率数组
      pictrue: 'http://testalcdn.miaopai.com/stream/of9fY5BtGMUX7apR8B1nhAw-QIX7FHMv-zCzSw__.mp4',
      getUrl
    }
  },
  mounted () {
    this.initPlay()
  },
  methods: {
    /**
     * 初始化videojs
     */
    initPlay () {
      this.player = videojs(document.querySelector('#videoPlayer'), {
        controls: true, // 是否显示控制条
        preload: 'auto',
        autoplay: false,
        language: 'zh-CN', // 设置语言
        sources: [{
          src: 'http://trans-test.oss-cn-beijing-internal.aliyuncs.com/stream/of9fY5BtGMUX7apR8B1nhAw-QIX7FHMv-zCzSw__.mp4?ssig=ca6c0569e80e79de5a67daa3b83428c0&time_stamp=1656848338630',
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
