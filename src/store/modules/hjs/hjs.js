export default {
  namespaced:true,
  state:{
    navList:{}
  },
  getters:{
    getFirstNavList:(state) => {
      return state.navList.filter(todo => todo.goodsTypeSuperior === 0)
    },
    getNextNavList:(state) => (id) => {
      return state.navList.filter(todo => todo.goodsTypeSuperior === id)
    }
  },
  mutations:{
    setNavList(state,arr){
      state.navList = arr
    }
  },
  actions:{}
}