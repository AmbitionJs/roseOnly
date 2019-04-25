import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import SIdentify from "@/components/wyj/identify"
Vue.prototype.axios = axios
//统一设置请求的前缀
axios.defaults.baseURL = "http://172.16.7.71:8080"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入基础css样式
import "@/Cssset/basecss.css"

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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
