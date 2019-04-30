<template>
  <div id="charging">
    <div id="charging-info" v-show="!show">
      <h2>消费明细</h2>
      <div id="freeIn">
        <span>免费时长：</span>
        <span>60分钟</span>
        <span id="freeM">0 元</span>
      </div>
      <div id="chargeIn">
        <span>收费时长：</span>
        <span>70分钟 * 0.2元/分钟</span>
        <span id="chargeM">14 元</span>
      </div>
      <div id="inAll">
        <span>总计：</span>
        <span id="allM">14元</span>
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
</template>

<script>
export default {
  name: 'charging',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
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
