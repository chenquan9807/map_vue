<template>
  <div id="header">
    <!--<div id="return">-->
      <!--<i class="iconfont icon-return">&#xe62f;</i>-->
    <!--</div>-->
    <router-link to="/">
      <i class="iconfont user-back">&#xe62f;</i>
    </router-link>
    <p>收费详情</p>
  </div>
</template>

<script>
export default {
  name: 'CostHeader',
  data () {
    return {
      Destination: 'Hello'
    }
  }
}
</script>

<style scoped>
  #header {
    width: 100%;
    height: 42px;
    color: white;
    overflow: hidden;
    background: linear-gradient(to bottom right, #1457ff, #13b0ff); /* 标准的语法 */
  }
  #return {
    width: 10%;
    float: left;
    overflow: hidden;
  }
  .icon-return {
    display: block;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
  }
  p {
    width: 80%;
    height: 42px;
    float: left;
    color: white;
    line-height: 42px;
    padding: 0 10px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .user-back {
    color: white;
    display: block;
    font-size: 15px;
    margin: 15px;
  }
</style>
