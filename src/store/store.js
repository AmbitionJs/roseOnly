import Vue from 'vue'
import Vuex from 'vuex'
import orders from './modules/orders'
import hjs from './modules/hjs/hjs'
import hsj from './modules/hsj/hsj'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orders,
    hjs,
    hsj,
  }
})
