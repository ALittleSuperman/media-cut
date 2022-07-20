<template>
  <div class="video-vr-container">
    <div class="video-container">
      <video
        id="Video"
        class="video-js vjs-default-skin"
        crossorigin="anonymous"
        controls
        playsinline
      >
        <source
          src="../assets/videovr/eagle-360.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-vr'
import 'video.js/dist/video-js.css'
import '../components/videojs-vr-control-plugin/index'
import '../components/videojs-vr-control-plugin/vr-control.scss'
export default {
  name: 'video-vr-control',
  data () {
    return {
      player: null,
      player_vr: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.player = videojs('#Video')
      this.player_vr = (window.vr = this.player.vr({
        projection: '360',
        debug: true,
        forceCardboard: false
      }))
      this.player.addChild('vrControl', this.player_vr)
    }
  }
}
</script>

<style lang="scss" scoped>
.video-vr-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .video-container::v-deep {
    width: 70%;
    height: 60%;
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
}
</style>
