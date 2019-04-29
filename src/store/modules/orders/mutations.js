export default {
  // 购物车结算时，保存商品，用于生成订单
  cartOrders(state, lists) {
    state.submitOrderList = []
    state.submitOrderList = lists
  },
  // 立即购买时，保存商品，用于生成订单
  buyNowOrders(state, lists) {
    state.submitOrderList = []
    state.submitOrderList = lists
  },
  // 地址
  addressDatas(state, lists) {
    state.getAddresses = []
    state.getAddresses = lists
  },
  setPay(state, obj) {
    state.payObj = {}
    state.payObj = obj
  }
}