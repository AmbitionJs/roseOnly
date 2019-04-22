import Vue from 'vue'
import Vuex from 'vuex'
import orders from './modules/orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orders,
  }
})
