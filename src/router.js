import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
    {// 王云杰  登录路由
      path: '/login',
      name: 'login',
      component: () => import('./views/wyj/Login.vue')
    },{// 王云杰  注册路由
      path: '/regester',
      name: 'regeter',
      component: () => import('./views/wyj/Regester.vue'),
    }
  ]
})
//路由拦截
//全局路由钩子函数
router.beforeEach((to,from,next)=>{
  console.log("即将跳转的路由",to);
  console.log("即将离开的路由",from);
  //判断是否有缓存
  var token = localStorage.getItem('token');
  //判断跳转的路由需不需要权限
  if(to.meta.auth){
    //若是还有缓存就可以让它跳转
      if(token){
        next();
    //没有缓存就去登录界面
      }else{
        next('/login')
      }
      //不需要权限直接跳转
  }else{
    next();
  }
})

export default router