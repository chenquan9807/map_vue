<template>
  <ul id="user-fun">
    <li>
      <i class="iconfont fun">&#xe630;</i>
      <p>信息</p>
      <i class="iconfont fun-in">&#xe62e;</i>
    </li>
    <li>
      <i class="iconfont fun">&#xe618;</i>
      <router-link to="/cost">
        <p>钱包</p>
      </router-link>
      <i class="iconfont fun-in">&#xe62e;</i>
    </li>
    <li>
      <i class="iconfont fun">&#xe702;</i>
      <p>行程</p>
      <i class="iconfont fun-in">&#xe62e;</i>
    </li>
    <li>
      <i class="iconfont fun">&#xe61d;</i>
      <p>设置</p>
      <i class="iconfont fun-in">&#xe62e;</i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'function'
}
</script>

<style scoped>
 #user-fun {
   width: 80%;
   min-height: 100px;
   margin: 0 auto;
   overflow: hidden;
   background: white;
   border-radius: 10px;
   position: relative;
   top: -30px;
 }
  #user-fun li {
    width: 80%;
    height: 60px;
    margin: 0 auto;
    padding: 15px;
  }
  .fun {
   color: #36d8ff;
   font-size: 20px;
   float: left;
  }
  #user-fun li p {
    float: left;
    height: 30px;
    font-size: 12px;
    display: block;
    padding-left: 10%;
    line-height: 30px;
  }
  .fun-in {
    font-size: 14px;
    color: #bbb5be;
    float: right;
  }
</style>
