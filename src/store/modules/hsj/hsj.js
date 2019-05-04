export default {
  namespaced: true,
  state: {
    orders: [],
    isLogin: false,
  },
  getters: {
    // 获得所有订单
    getAllOrders: (state) => {
      return state.orders
    },
    // 获取对应订单
    getNextNavList: (state) => (id) => {
      return state.navList.filter(todo => todo.goodsTypeSuperior === id)
    },
    getIsLogin: state => {
      return state.isLogin
    },
  },
  mutations: {
    // 设置订单
    setOrders(state, arr) {
      state.orders = arr
    },
    // 修改登录状态值
    setIsLogin(state) {
      state.isLogin = !state.isLogin
    }
  },
  actions: {}
}