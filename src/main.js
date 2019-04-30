// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
// 引入store内的Vuex
import store from './store'
import BaiduMap from 'vue-baidu-map'

import 'animate.css'
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/iconfont.css'

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥
  ak: 'ypQIGddmmB7t1gmLO7YKiHQOF0SUwKUl'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
