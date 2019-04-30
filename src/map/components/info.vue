<template>
  <div id="Info">
    <div id="intro">
      <p id="name">{{Destination}}</p>
      <span class="distance" v-if="Distance <= 1000">距离：{{Distance}}米</span>
      <span class="distance" v-else>距离：{{(Distance/1000).toFixed(2)}}公里</span>
      <span>预计剩余车位：{{status}}</span>
    </div>
    <div id="down" v-on:click="Down">
      <i class="iconfont">&#xe695;</i>
    </div>
    <div id="setOut" v-on:click="setOut">
      <i class="iconfont icon-go">&#xe704;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: {
    Destination: String,
    Distance: String,
    pointA: Object,
    pointB: Object,
    status: Number
  },
  methods: {
    setOut () {
      this.$emit('InfoOut', this.pointB, this.pointA, 0)
    },
    Down () {
      this.$emit('infoDown')
    }
  }
}
</script>

<style scoped>
  #Info {
    display: none;
    width: 100%;
    height: 150px;
    padding: 15px;
    overflow: hidden;
    background: white;
    box-shadow: 0 0 1px #57545a inset;
  }
  #intro {
    width: fit-content;
    height: 100px;
    float: left;
    overflow: hidden;
  }
  #name {
    font-family: Georgia, serif;
    font-weight: bold;
    color: black;
    font-size: 18px;
  }
  .distance {
    display: block;
    margin-top: 10px;
  }
  #down {
    height: 51px;
    float: left;
    color: #d5d5f5;
    font-size: 30px;
    margin-top: -15px;
    margin-left: 40px;
    padding: 0;
  }
  #setOut {
    width: 50px;
    height: 50px;
    float: right;
    color: white;
    padding-top: 10px;
    padding-left: 17px;
    border-radius: 25px;
    background-color: #3385ff;
  }
  .icon-go {
    font-size: 20px;
  }
</style>
