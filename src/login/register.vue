<template>
  <div id="register" class="animated tada">
    <router-link to="/">
      <i class="iconfont user-back">&#xe62f;</i>
    </router-link>
    <div id="container">
      <h1>Register</h1>
      <form @submit.prevent="checkForm" action="#" method="post">
        <!--<input-->
          <!--id="test"-->
          <!--name="username"-->
          <!--type="text"-->
          <!--placeholder="用户昵称"-->
          <!--v-on:blur="blurName"-->
          <!--v-model="username"-->
        <!--&gt;-->
        <!--<input-->
          <!--name="telnumber"-->
          <!--type="text"-->
          <!--placeholder="手机号码"-->
          <!--v-on:blur="blurTel"-->
          <!--v-model="telnumber"-->
        <!--&gt;-->
        <!--<input-->
          <!--name="password"-->
          <!--type="password"-->
          <!--placeholder="用户密码"-->
          <!--v-on:blur="blurPassword"-->
          <!--v-model="password"-->
        <!--&gt;-->
        <!--<input-->
          <!--name="confirm"-->
          <!--type="password"-->
          <!--placeholder="确认密码"-->
          <!--v-on:blur="blurConfirm"-->
          <!--v-model="confirm"-->
        <!--&gt;-->
        <!--<button-->
          <!--type="submit"-->
          <!--id="login-button"-->
          <!--v-on:click="register"-->
        <!--&gt;-->
          <!--立即注册-->
        <!--</button>-->
        <input
          id="test"
          name="username"
          type="text"
          placeholder="用户昵称"
          v-on:blur="blurName"
          v-model="username"
        >
        <input
          name="telnumber"
          type="text"
          placeholder="手机号码"
          v-on:blur="blurTel"
          v-model="telnumber"
        >
        <input
          name="Verification"
          type="text"
          placeholder="验证码"
          v-model="vCode"
        >
        <input
          name="license"
          type="text"
          placeholder="车牌号"
          v-on:blur="blurLicense"
          v-model="license"
          v-if="!show"
        >
        <input
          name="password"
          type="password"
          placeholder="用户密码"
          v-on:blur="blurPassword"
          v-model="password"
          v-if="!show"
        >
        <!--<input-->
          <!--name="confirm"-->
          <!--type="password"-->
          <!--placeholder="确认密码"-->
          <!--v-on:blur="blurConfirm"-->
          <!--v-model="confirm"-->
          <!--v-if="!show"-->
        <!--&gt;-->
        <button
          type="submit"
          id="login-button"
          v-on:click="register"
        >
          获取验证码
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
import '../assets/style/background.css'
export default {
  name: 'register',
  data () {
    return {
      rUser: /^[a-zA-Z0-9_]{4,16}$/,
      rTel: /^1[34578]\d{9}$/,
      rPass: /^[a-zA-Z]\w{5,17}$/,
      rlicense: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
      username: '',
      telnumber: '',
      license: '',
      vCode: '',
      password: '',
      // confirm: '',
      reUser: 0,
      reTel: 0,
      rePass: 0,
      // reCon: 0,
      nClick: 0,
      show: true
      // showText: '发送验证码'
    }
  },
  mounted () {
    const ScreenHeight = document.documentElement.clientHeight
    $('#register').css('height', ScreenHeight)
    const username = $("input[name='username']")
    username.focus(function () {
      username.css('color', '#0a0fff')
      username.attr('placeholder', '数字、字母、下划线,4-16位')
    })
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
    const license = $("input[name='license']")
    license.focus(function () {
      license.css('color', '#0a0fff')
      license.attr('placeholder', '车牌号')
    })
    // const confirm = $("input[name='confirm']")
    // confirm.focus(function () {
    //   confirm.css('color', '#0a0fff')
    //   confirm.attr('placeholder', '6-8位，数字、字母')
    // })
  },
  methods: {
    checkForm () {
      return this.reUser && this.reTel && this.rePass && this.reCon
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
    blurLicense () {
      const license = $("input[name='license']")
      license.attr('placeholder', '车牌号')
      var reResult = this.rlicense.test(this.license)
      if (reResult) {
        this.rePass = 1
        license.css('color', 'white')
      } else {
        this.rePass = 0
        license.css('color', 'red')
      }
    },
    // blurConfirm () {
    //   const confirm = $("input[name='confirm']")
    //   confirm.attr('placeholder', '确认密码')
    //   var reResult = this.rPass.test(this.confirm)
    //   if (reResult && this.confirm === this.password) {
    //     this.reCon = 1
    //     confirm.css('color', 'white')
    //   } else {
    //     this.reCon = 0
    //     confirm.css('color', 'red')
    //   }
    // },
    register () {
      let vm = this
      if (vm.username === '' || vm.telnumber === '') {
        alert('请填写用户名和手机号')
        return false
      }
      if (vm.nClick === 0) {
        vm.show = false
        vm.nClick++
        $('#login-button').text('立即注册')
        // vm.showText = '立即注册'
        $.ajax({
          url: '/api/use/sendCode',
          type: 'post',
          // data对象中的属性名要和服务端控制器的参数名一致 login(name, password)
          data: {
            'phoneNum': vm.telnumber
          },
          dataType: 'json',
          success: function (response) {
            console.log(response)
          },
          error: function (e) {
            console.log(e)
          }
        })
      }
      if (vm.nClick >= 1) {
        if (vm.username === '' || vm.telnumber === '' || vm.vCode === '' ||
          vm.password === '' || vm.license === '' || vm.vCode === '') {
          alert('请填写完整信息')
          return false
        }
        // if (vm.vCode != ) {
        //   alert('验证码不正确')
        //   return false
        // }
        $.ajax({
          url: '/api/user/register',
          type: 'post',
          // data对象中的属性名要和服务端控制器的参数名一致 login(name, password)
          data: {
            'userName': vm.username,
            'password': vm.password,
            'phoneNum': vm.telnumber,
            'license': vm.license
          },
          dataType: 'json',
          success: function (response) {
            console.log(response)
            if (response.ret === false) {
              alert('注册失败，请重试')
            } else {
              this.$router.push({path: '/login'})
            }
          },
          error: function (e) {
            console.log(e)
          }
        })
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
  #register {
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
</style>
