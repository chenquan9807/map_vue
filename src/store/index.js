import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  n: 0,
  userName: '',
  passWord: '',
  licenseNumber: '',
  ifArrive: false
}
const mutations = {
  addn (state, num) {
    state.n = state.n + num
  },
  username (state, str) {
    state.userName = str
  },
  password (state, str) {
    state.passWord = str
  },
  license (state, str) {
    state.licenseNumber = str
  },
  Arrived (state, sum) {
    state.ifArrive = sum
  }
}
const store = new Vuex.Store({
  state,
  mutations
})

export default store
