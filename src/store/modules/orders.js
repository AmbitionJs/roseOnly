import mutations from './orders/mutations'

const state = {
  submitOrderList: [],
  getAddresses: [],
  payObj: {},
  currentPage: 1,
  applyObj: {}
}


export default {
  namespaced:true,
  state,
  mutations
}