import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
     // 黄家盛
     {
      path:'/',
      name:'home',
      component: () => import('./views/hjs/Home.vue')
    },
    {
      path:'/Category/:id',
      name:'Category',
      component: () => import('./views/hjs/Category.vue')
    },
    {
      path:'/GoodsDetail/:id',
      name:'GoodsDetail',
      component:() => import('./views/hjs/GoodsDetail.vue')
    },
    // 贺斯洁
    {
      path: '/person',
      name: 'person',
      component: () => import('./views/hsj/Person.vue')
    },
    {// 陈世厚
      path: '/foot',
      name: 'foot',
      component: () => import('./views/csh/index.vue')
    },
    {
      path: '/car',
      name: 'car',
      component: () => import('./views/zjl/Car.vue')
    },
    {
      path: '/submitOrder',
      name: 'submitOrder',
      component: () => import('./views/zjl/SubmitOrder.vue')
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('./views/zjl/ForgotPassword.vue')
    },
  ],
})