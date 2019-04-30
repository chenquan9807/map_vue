<template>
  <div>
    <div id="duration">
      <div id="lenTime">
        <div id="hour">
          <p>{{hour}}<span>h</span></p>
        </div>
        <div id="sep"></div>
        <div id="minute">
          <p>{{minute}}<span>m</span></p>
        </div>
      </div>
      <div id="parkInfo">
        <h2>停车信息</h2>
        <div id="parkName">
          <span id="nameIn">停车地点：</span>
          <span id="name">{{Destination}}</span>
        </div>
        <div id="startTime">
          <span>驶入时间：</span>
          <span>{{arrivetime}}</span>
        </div>
        <div id="stopTime">
          <span>驶出时间：</span>
          <span>{{lefttime}}</span>
        </div>
      </div>

    </div>
    <div id="charging">
      <div id="charging-info" v-show="!show">
        <h2>消费明细</h2>
        <div id="freeIn">
          <span>免费时长：</span>
          <span>0时</span>
          <span id="freeM">0 元</span>
        </div>
        <div id="chargeIn">
          <span>收费时长：</span>
          <span>{{hour  + minute / 60}}时 * 5元/时</span>
          <span id="chargeM">{{(hour  + minute / 60) * 5}} 元</span>
        </div>
        <div id="inAll">
          <span>总计：</span>
          <span id="allM">{{hour  + minute / 60}}元</span>
        </div>
        <div id="payments">
          <div id="weChat">微信</div>
          <div id="Alipay">支付宝</div>
          <div id="balance">余额</div>
        </div>
      </div>
      <div id="charging-per" v-show="show">
        <p>5元 / 时</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Duration',
  data () {
    return {
      arrivetime: '',
      lefttime: '',
      hour: 0,
      minute: 0,
      cost: 0,
      left: false,
      show: true
    }
  },
  props: {
    Destination: ''
  },
  mounted () {
    var vm = this
    // 触发socket连接
    // this.$socket.emit('login', localStorage.username)
    this.arrivetime = this.nowtime()
    this.parkTime()
    window.websocket.send(window.localStorage.username + 'cost')
    vm.leave()
    window.websocket.onmessage = function (event) {
      var data = $.parseJSON(event.data)
      if (data[0] === window.localStorage.username) {
        vm.left = true
        vm.show = false
        vm.lefttime = vm.nowtime()
        window.clearInterval(window.parktime)
        window.clearInterval(window.left)
      }
    }
  },
  methods: {
    nowtime () {
      var now = new Date()
      var year = now.getFullYear() // 年
      var month = now.getMonth() + 1 // 月
      var day = now.getDate() // 日
      var hh = now.getHours() // 时
      var mm = now.getMinutes() // 分
      var clock = year + '-'
      if (month < 10) { clock += '0' }
      clock += month + '-'
      if (day < 10) { clock += '0' }
      clock += day + ' '
      if (hh < 10) { clock += '0' }
      clock += hh + ':'
      if (mm < 10) clock += '0'
      clock += mm
      return clock
    },
    parkTime () {
      let vm = this
      var t = 0
      // eslint-disable-next-line
      window.parktime = window.setInterval(function () {
        t = t + 1
        if (t >= 60) {
          t = 0
          vm.minute = vm.minute + 1
          if (vm.minute >= 60) {
            vm.minute = 0
            vm.hour = vm.hour + 1
          }
        }
      }, '1000')
    },
    leave () {
      var left = window.setInterval(function () {
        window.websocket.send(window.localStorage.username)
      }, 10000)
      window.left = left
    }
  }
}
</script>

<style scoped>
  #duration {
    width: 100%;
    height: auto;
    background: #eee;
    overflow: hidden;
  }
  #lenTime {
    width: 100%;
    height: 230px;
    overflow: hidden;
    background: linear-gradient(to bottom right, #1689ff, #6bfffc);
  }
  #sep {
    width: 10%;
    height: 150px;
    font-size: 80px;
    overflow: hidden;
    float: left;
    margin-top: 25px;
    line-height: 150px;
    text-align: center;
  }
  #hour, #minute {
    width: 35%;
    height: 150px;
    color: white;
    font-size: 80px;
    font-weight: bold;
    background: linear-gradient(to bottom right, #5489ce, #59c1d2);
    float: left;
    margin-top: 25px;
    border-radius: 15px;
  }
  #hour span, #minute span {
    color: white;
    font-size: 16px;
  }
  #hour {
    margin-left: 10%;
  }
  #hour p, #minute p {
    color: white;
    text-align: center;
    font-size: 80px;
    line-height: 150px;
  }
  #parkInfo {
    width: 95%;
    height: auto;
    margin: 0 auto;
    color: #aba9b4;
    border-radius: 10px;
    background: white;
    overflow: hidden;
    padding: 10px 10px 20px 20px;
    position: relative;
    top: -30px;
    clear: both;
  }
  #parkInfo h2 {
    color: #000;
    width: fit-content;
    display: block;
    font-weight: bold;
  }
  #parkName, #startTime, #stopTime {
    width: 100%;
    overflow: hidden;
  }
  #nameIn {
    float: left;
  }
  #name {
    float: left;
    display: block;
    width: fit-content;
    max-width: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  #charging {
    width: 95%;
    height: auto;
    color: #aba9b4;
    border-radius: 10px;
    background: white;
    overflow: hidden;
    margin: -10px auto 0;
    padding: 10px 10px 20px 20px;
  }
  #charging h2 {
    color: #000;
    width: fit-content;
    display: block;
    font-weight: bold;
  }
  #freeM, #chargeM, #allM {
    float: right;
  }
  #inAll {
    margin-top: 20px;
  }
  #allM {
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  #payments {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;
  }
  #weChat, #Alipay, #balance {
    width: 25.3%;
    float: left;
    padding: 6px;
    color: white;
    border-radius: 8px;
    text-align: center;
    margin: 0 4% 0 4%;
  }
  #weChat {
    background: #14b73b;
  }
  #Alipay {
    background: #039ee9;
  }
  #balance {
    background: #0cc49f;
  }
  #charging-per {
    width: 100%;
    color: black;
    text-align: center;
    margin-top: 20px;
    font-size: 25px;
    font-weight: bolder;
  }
</style>
