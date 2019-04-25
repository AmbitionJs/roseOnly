import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import axios from 'axios'
import SIdentify from "@/components/wyj/identify"
Vue.prototype.axios = axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入基础css样式
import "@/Cssset/basecss.css"
// 引入跨域 qs
import qs from 'qs'

Vue.use(ElementUI);
//这个是使用动态验证码
Vue.use(SIdentify);
//请求拦截
axios.interceptors.request.use(config=>{
  //每次请求判断token
  const token = localStorage.getItem('token');
  token && (config.headers["Authorization"]="Bearer "+token)
  return config;
},error =>{
  return Promise.reject(error)
});
//响应拦截
axios.interceptors.response.use(function(response){
  if(response.data.token){
    //更新token
    localStorage.setItem('token',response.data.token)
  }
  return response ;
},function(error){
  let res = error.response
  switch(res.status){
    case 401:
    //token验证失败，需要重新登录
    localStorage.removeItem('token')
    return router.replace({
      path:'/login'
    })
  }
  return Promise.reject(error);
});

// 省市区插件
import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'

Vue.use(VueAreaLinkage)


// 统一设置请求的前缀
// axios.defaults.baseURL = 'http://172.16.7.71:8080'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  if(config.type == 'formData' || config.method != 'post'){
      return config
  }
  config.data = qs.stringify(config.data)
  return config
  }, (err) =>{
  return Promise.reject(err);
})

// 请求拦截
// axios.interceptors.request.use(config => {
//   // 每次发请求之前都需要判断token
//   // 如果存在，则在请求头上带上token，一起发给后台验证
//   const token = localStorage.getItem('token')
//   token && (config.headers["Authorization"] = "Bearer " + token)
//   return config
// }, error => {
//   return Promise.reject(error);
// })

// // 响应拦截
// axios.interceptors.response.use(response => {
//   if (response.data.token) {
//     // 更新token
//     localStorage.setItem('token', response.data.token)
//   }
//   return response;
// }, error => {
//   let res = error.response
//   switch (res.status) {
//     case 401:
//       // token 验证失败,需要重新登陆
//       localStorage.removeItem('token')
//       return router.replace({
//         path: '/login'
//       })
//     case 404:
//       console.log('404错误')
//       break
//   }

//   return Promise.reject(error);
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
