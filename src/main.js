import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 统一设置请求的前缀
axios.defaults.baseURL = 'http://192.168.2.220:8081'

// 请求拦截
axios.interceptors.request.use(config => {
  // 每次发请求之前都需要判断token
  // 如果存在，则在请求头上带上token，一起发给后台验证
  const token = localStorage.getItem('token')
  token && (config.headers["Authorization"] = "Bearer " + token)
  return config
}, error => {
  return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use(response => {
  if (response.data.token) {
    // 更新token
    localStorage.setItem('token', response.data.token)
  }
  return response;
}, error => {
  let res = error.response
  switch (res.status) {
    case 401:
      // token 验证失败,需要重新登陆
      localStorage.removeItem('token')
      return router.replace({
        path: '/login'
      })
    case 404:
      console.log('404错误')
      break
  }

  return Promise.reject(error);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
