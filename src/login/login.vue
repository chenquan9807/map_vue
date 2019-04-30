<template>
  <div id="login" className="animated pulse">
    <div id="container">
      <h1>Welcome</h1>
      <form @submit.prevent="checkForm" action="#" method="post">
        <input
          id="test"
          name="username"
          type="text"
          placeholder="用户昵称"
          v-on:blur="blurName"
          v-model="username"
        >
        <input
          name="password"
          type="password"
          placeholder="用户密码"
          v-on:blur="blurPassword"
          v-model="password"
        >
        <button
          type="submit"
          id="login-button"
          v-on:click="Login"
        >
          Login
        </button>
      </form>
      <div id="others">
        <router-link to="/register">
          <span>注册</span>
        </router-link>
        <span>|</span>
        <router-link to="/forget">
          <span>忘记密码</span>
        </router-link>
        <span>|</span>
        <span id="vistor" v-on:click="Guest">游客访问</span>
        <p style="color: red" v-if="!error">用户密码不正确</p>
      </div>
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
// import store from '../store'
import '../assets/style/background.css'
export default {
  name: 'login',
  data () {
    return {
      rUser: /^[a-zA-Z0-9_]{4,16}$/,
      rPass: /^[a-zA-Z]\w{5,17}$/,
      username: '',
      password: '',
      reUser: 0,
      rePass: 0,
      error: true
    }
  },
  methods: {
    Login () {
      let vm = this
      if (this.reUser && this.rePass) {
        var storage = window.localStorage
        $.ajax({
          url: '/api/user/login',
          type: 'post',
          // data对象中的属性名要和服务端控制器的参数名一致 login(name, password)
          data: {
            'userName': vm.username,
            'password': vm.password
          },
          dataType: 'json',
          success: function (response) {
            // storage['license'] = '湘A123456'
            if (response.data === false) {
              vm.error = false
              return false
            }
            if (response.data === true) {
              storage['n'] = 1
              storage['username'] = vm.username
              storage['password'] = vm.password
              storage['license'] = '湘A12345'
              $('form').fadeOut(500)
              $('#login').addClass('form-success')
              vm.$router.push({path: '/'})
            }
            // console.log(response)
            // vm.points = response.data.points
          },
          error: function (e) {
            console.log(e)
            return false
          }
        })
      }
    },
    Guest () {
      var storage = window.localStorage
      storage['username'] = this.username
      storage['password'] = this.password
      storage['license'] = '湘A123456'
      storage['n'] = 1
      $('form').fadeOut(500)
      this.$router.push({path: '/'})
    },
    checkForm () {
      return this.reUser && this.rePass
    },
    blurName () {
      const username = $("input[name='username']")
      username.attr('placeholder', '用户昵称')
      var reResult = this.rUser.test(this.username)
      if (reResult) {
        this.reUser = 1
        username.css('color', 'white')
      } else {
        this.reUser = 0
        username.css('color', 'red')
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
    }
  },
  mounted () {
    const ScreenHeight = document.documentElement.clientHeight
    $('#login').css('height', ScreenHeight)
    const username = $("input[name='username']")
    username.focus(function () {
      username.css('color', '#0a0fff')
      username.attr('placeholder', '数字、字母、下划线,4-16位')
    })
    const password = $("input[name='password']")
    password.focus(function () {
      password.css('color', '#0a0fff')
      password.attr('placeholder', '字母开头、数字、下划线，6-14位')
    })
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
    margin-top: 40%;
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

  #login {
    background: -webkit-linear-gradient(left top, #21d0ff, #1f6eff, #291eff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #21d0ff, #1f6eff, #291eff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #21d0ff, #1f6eff, #291eff); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #21d0ff, #1f6eff, #291eff); /* 标准的语法 */
    width: 100%;
    overflow: hidden;
    opacity: 0.8;
  }

  #others {
    width: 100%;
    color: #000;
    position: absolute;
    bottom: 5%;
    top: 420px;
    left: 0;
    text-align: center;
    z-index: 2;
  }

  #others span {
    color: #050709;
  }
  #vistor {
    font-weight: bold;
  }
</style>
