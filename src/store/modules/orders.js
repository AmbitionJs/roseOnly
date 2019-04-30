import mutations from './orders/mutations'

const state = {
  submitOrderList: [],
  getAddresses: [],
  payObj: {}
}

export default {
  namespaced:true,
  state,
  mutations
}