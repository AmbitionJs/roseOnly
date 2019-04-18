import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入基础css样式
import "@/Cssset/basecss.css"

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
