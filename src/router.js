import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes: [
    // 贺斯洁
    {
      path: '/person',
      name: 'person',
      component: () => import('./views/hsj/test.vue')
    },
    {// 陈世厚
      path: '/foot',
      name: 'foot',
      component: () => import('./views/csh/index.vue')
    },
    {// 王云杰
      path: '/login',
      name: 'login',
      component: () => import('./views/wyj/Login.vue')
    }
  ]
})
