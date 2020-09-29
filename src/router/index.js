import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import index from '@/components/index'
import allDynamic from '@/components/tabbar/allDynamic'
import publish from '@/components/tabbar/publish'
import select from '@/components/tabbar/select'
import register from '@/components/register'
import profile from '@/components/tabbar/profile'
import agreeRequest from '@/components/tabbar/agreeRequest'
import chat from '@/components/tabbar/chat'
import dynamicInfo from '@/components/tabbar/dynamicInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/dynamic',
      name: 'allDynamic',
      component: allDynamic
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/select',
      name: 'select',
      component: select
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/agreeRequest',
      name: 'agreeRequest',
      component: agreeRequest
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: chat
    },
    {
      path: '/dynamic/:id',
      name: 'dynamicInfo',
      component: dynamicInfo
    }
  ]
})
