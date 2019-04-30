<template>
  <div id="user-header">
    <router-link to="/">
      <i class="iconfont user-back" v-on:click="user_hidden">&#xe62f;</i>
    </router-link>
    <div id="user-info">
      <div id="user-img">
        <img src="../../assets/images/p2.jpg" alt="">
      </div>
      <p>{{username}}</p>
      <p>{{license}}</p>
    </div>
    <div>
      <i class="iconfont user-logout" v-on:click="log_out">&#xe621;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userheader',
  data () {
    return {
      username: '',
      license: ''
    }
  },
  mounted () {
    this.username = localStorage.username
    this.license = localStorage.license
  },
  methods: {
    user_hidden () {
      this.$emit('user_hidden')
    },
    log_out () {
      window.websocket.onclose = function () {
        console.log('websocket关闭')
      }
      localStorage.clear()
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>
  #user-header {
    width: 100%;
    height: 35%;
    overflow: hidden;
    background: -webkit-linear-gradient(left top, #21d0ff, #1f6eff, #291eff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #21d0ff, #1f6eff, #291eff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #21d0ff, #1f6eff, #291eff); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #21d0ff, #1f6eff, #291eff); /* 标准的语法 */
    clear: both;
  }
  .user-back {
    color: white;
    display: block;
    font-size: 15px;
    margin: 15px;
  }
  #user-info {
    width: fit-content;
    margin: 0 auto;
    overflow: hidden;
  }
  #user-img {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    border: 2px solid white;
    border-radius: 35px;
    overflow: hidden;
  }
  #user-img img {
    width: 100%;
  }
  #user-info p {
    color: white;
    margin-top: 5px;
    font-size: 16px;
    text-align: center;
    clear: both;
  }
  .user-logout {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .user-back {
    color: white;
    display: block;
    font-size: 15px;
    margin: 15px;
  }
</style>
