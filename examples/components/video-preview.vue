<template>
  <div class="container">
    <div class="mask_copy" />
    <div class="mask">
      <div class="line">
        <div class="bottom"></div>
        <div class="top"></div>
      </div>
      <div class="imgcontainer">
        <div class="imgs">
          <img
            v-for="n in 30"
            :key="n"
            :src="`http://testalcdn.miaopai.com/stream/AYA3irpfo9GkWB9MQOQrm89kEwmHZacLzM4QoA__.mp4/${2 * n}000/ws.jpg`">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-preview'
}
</script>

<style lang="scss" scoped>
.container:hover .mask {
  display: block;
}.container:hover .mask_copy {
  display: block;
}
.container {
  width: 200px;
  height: 100px;
  margin: 10px;
  position: relative;
  box-sizing: border-box;
  background-image: url("../assets/preview/home.webp");
  background-size: 100% 100%;
  box-shadow: #E9E9E9;
  .mask_copy {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: none;
    z-index: 10;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    display: none;
    overflow: hidden;
    z-index: 1;
    .imgcontainer {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .imgs {
      position: absolute;
      width: 6000px;
      height: 100px;
      display: flex;
      left: 0;
      img {
        width: 200px;
        height: 100px;
      }
    }
    .line {
      position: relative;
      width: 100%;
      height: 10px;
      background-color: black;
      border-radius: 2px;
      z-index: 99;
      div {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -98px;
        height: 2px;
      }
      .bottom {
        background-color: #444;
        border-radius: 2px;
        width: 196px;
      }
      .top {
        background-color: #FFF;
        border-radius: 2px;
        width: 0px;
      }
    }
  }
}
</style>
