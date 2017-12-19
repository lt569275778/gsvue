import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/auth'
import Auths from '@/views/auths'
import Paysuccess from '@/views/paysuccess'
import Certification from '@/views/certification'
import Page403 from '@/views/page403'
import Home from '../components/home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/auths',
      name: 'auths',
      component: Auths
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: Paysuccess
    },
    {
      path: '/certification',
      name: 'certification',
      component: Certification
    },
    {
      path: '/page403',
      component: Page403
    }
  ]
})
