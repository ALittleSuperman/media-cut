<template>
  <div class="container">
    <div class="mask">
      <div class="line">
        <div class="bottom"></div>
        <div class="top"></div>
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
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../assets/preview/all.jpeg");
    background-size: 6000px 100px;
    width: 100%;
    display: none;
    .line {
      position: relative;
      width: 100%;
      height: 10px;
      background-color: black;
      border-radius: 2px;
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
