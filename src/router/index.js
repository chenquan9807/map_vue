import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/map/map'
import User from '@/user/user'
import Login from '@/login/login'
import Register from '@/login/register'
import Forget from '@/login/forget'
import Cost from '@/cost/cost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/cost',
      name: 'Cost',
      component: Cost
    }
  ]
})
