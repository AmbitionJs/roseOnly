export default {
  namespaced: true,
  state: {
    orders: {}
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
  },
  mutations: {
    // 设置订单
    setOrders(state, arr) {
      state.orders = arr
    },
  },
  actions: {}
}