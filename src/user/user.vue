<template>
  <div id="User" class="animated">
    <user-header @user_hidden="user_hidden"></user-header>
    <user-function></user-function>
    <p>&copy;POWERED BY MAT</p>
  </div>
</template>

<script>
import $ from 'jquery'
import UserHeader from './components/userheader'
import UserFunction from './components/function'
export default {
  name: 'user',
  components: {
    UserHeader: UserHeader,
    UserFunction: UserFunction
  },
  methods: {
    user_hidden () {
      const user = $('#User')
      user.removeClass('fadeInUpBig')
      user.addClass('animated fadeOutLeft')
    }
  }
}
</script>

<style scoped>
  #User {
    display: none;
    width: 100%;
    height: 100%;
    background: #eee;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  p {
    color: #878787;
    text-align: center;
  }
</style>
