<template>
  <div id="header">
    <div id="beforeSearch">
      <!--<router-link to="/User">-->
        <div id="iconMenu" v-on:click="User">
          <img src="../../assets/images/p2.jpg" alt="头像">
        </div>
      <!--</router-link>-->
      <div id="inputBox">
        <input type="text" id="search" placeholder="请输入目的地名称">
      </div>
      <div id="searchResultPanel"></div>
    </div>
    <div id="afterSearch">
      <div id="return" v-on:click="Ricon">
        <i class="iconfont icon-return">&#xe62f;</i>
      </div>
      <p>{{Destination}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    Destination: String
  },
  methods: {
    Ricon () {
      this.$router.go(0)
    },
    User () {
      this.$emit('User')
    }
  }
}
</script>

<style scoped>
  #afterSearch {
    color: white;
    display: block;
  }
  #afterSearch p {
    color: white;
  }
  #beforeSearch {
    display: block;
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
    line-height: 42px;
    padding: 0 10px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  #header {
    width: 100%;
    height: 60px;
    overflow: hidden;
    background: linear-gradient(to bottom right, #1d87ff, #1420ff); /* 标准的语法 */
  }
  #iconMenu {
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: white;
    float: left;
    border-radius: 40px;
    margin: 0 10px;
  }
  #iconMenu img {
    width: 100%;
  }
  #inputBox {
    width: 80%;
    height: 40px;
    background: white;
    margin: 10px 5%;
    border-radius: 5px;
    font-size: 16px;
    color: rgba(87, 84, 90, 0.5);
    overflow: hidden;
  }
  #search {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-left: 0;
    border: none;
    outline: none;
    padding: 0 1em;
  }
  #searchResultPanel {
    float: left;
  }
</style>
