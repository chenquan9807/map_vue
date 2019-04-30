<template>
  <div id="forget" class="animated tada">
    <router-link to="/">
      <i class="iconfont user-back">&#xe62f;</i>
    </router-link>
    <div id="container">
      <h1>找回密码</h1>
      <form @submit.prevent="checkForm" action="#" method="post">
        <input
          name="telnumber"
          type="text"
          placeholder="手机号码"
          v-on:blur="blurTel"
          v-model="telnumber"
        >
        <div id="verify-box">
          <input
            id="verify"
            name="verify"
            type="text"
            placeholder="验证码"
          >
          <div id="get-verify">发送</div>
        </div>
        <input
          name="password"
          type="password"
          placeholder="新的密码"
          v-on:blur="blurPassword"
          v-model="password"
        >
        <input
          name="confirm"
          type="password"
          placeholder="确认密码"
          v-on:blur="blurConfirm"
          v-model="confirm"
        >
        <button
          type="submit"
          id="login-button"
        >
          立即找回
        </button>
      </form>
    </div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'forget',
  data () {
    return {
      rTel: /^1[34578]\d{9}$/,
      rPass: /^[a-zA-Z]\w{5,17}$/,
      telnumber: '',
      password: '',
      confirm: '',
      reTel: 0,
      rePass: 0,
      reCon: 0
    }
  },
  mounted () {
    const ScreenHeight = document.documentElement.clientHeight
    $('#forget').css('height', ScreenHeight)
    const telname = $("input[name='telnumber']")
    telname.focus(function () {
      telname.css('color', '#0a0fff')
      telname.attr('placeholder', '11位数字')
    })
    const password = $("input[name='password']")
    password.focus(function () {
      password.css('color', '#0a0fff')
      password.attr('placeholder', '字母开头、数字、下划线，6-14位')
    })
    const confirm = $("input[name='confirm']")
    confirm.focus(function () {
      confirm.css('color', '#0a0fff')
      confirm.attr('placeholder', '6-8位，数字、字母')
    })
  },
  methods: {
    checkForm () {
      console.log(this.reTel && this.rePass && this.reCon)
      return this.reTel && this.rePass && this.reCon
    },
    blurTel () {
      const telnumber = $("input[name='telnumber']")
      telnumber.attr('placeholder', '手机号码')
      var reResult = this.rTel.test(this.telnumber)
      if (reResult) {
        this.reTel = 1
        telnumber.css('color', 'white')
      } else {
        this.reTel = 0
        telnumber.css('color', 'red')
      }
    },
    blurPassword () {
      const password = $("input[name='password']")
      password.attr('placeholder', '用户密码')
      var reResult = this.rPass.test(this.password)
      if (reResult) {
        this.rePass = 1
        password.css('color', 'white')
      } else {
        this.rePass = 0
        password.css('color', 'red')
      }
    },
    blurConfirm () {
      const confirm = $("input[name='confirm']")
      confirm.attr('placeholder', '确认密码')
      var reResult = this.rPass.test(this.confirm)
      if (reResult && this.confirm === this.password) {
        this.reCon = 1
        confirm.css('color', 'white')
      } else {
        this.reCon = 0
        confirm.css('color', 'red')
      }
    }
  }
}
</script>

<style scoped>
  @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
    overflow: hidden;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  #container {
    margin-top: 20%;
  }
  .user-back {
    display: block;
    color: white;
    font-size: 15px;
    margin: 15px;
  }
  form {
    padding: 20px 0;
    position: relative;
    z-index: 2;
  }
  form input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
    font-weight: 300;
  }
  form input:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  form input:focus {
    background-color: white;
    width: 300px;
    color: #0a0fff;
  }
  form button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #0a0fff;
    border-radius: 3px;
    width: 250px;
    cursor: pointer;
    font-size: 18px;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
  }
  form button:hover {
    background-color: #f5f7f9;
  }
  #forget {
    background: -webkit-linear-gradient(left top, #21d0ff, #1f6eff, #291eff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #21d0ff, #1f6eff, #291eff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #21d0ff, #1f6eff, #291eff); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #21d0ff, #1f6eff, #291eff); /* 标准的语法 */
    width: 100%;
    overflow: hidden;
    opacity: 0.8;
  }
  #container  button {
    opacity: 0.8;
    color: #060606;
    background: linear-gradient(to right, #83ff59, #d5ff10); /* 标准的语法 */
  }
  #verify-box {
    width: 250px;
    margin: 0 auto;
    overflow: hidden;
  }
  #verify-box input{
    width: 160px;
    border: none;
    border-radius: 0;
    background-color: white;
    opacity:0.6;
    float: left;
  }
  #verify-box input:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  #verify-box input:focus {
    width: 160px;
  }
  #get-verify {
    width: 90px;
    line-height: 41px;
    font-weight: bold;
    background: #09ccb8;
    border-left: 1px solid #95979a;
  }
</style>
