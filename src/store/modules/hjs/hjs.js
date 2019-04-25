export default {
  namespaced:true,
  state:{
    navList:{}
  },
  getters:{
    // 获得一级列表
    getFirstNavList:(state) => {
      return state.navList.filter(todo => todo.goodsTypeSuperior === 0)
    },
    // 获得子级列表(参数为父级分类id)
    getNextNavList:(state) => (id) => {
      return state.navList.filter(todo => todo.goodsTypeSuperior === id)
    },
    // 获得首页轮播图
    getHomeLB:(state) => {
      return state.navList.filter(todo => todo.picCode === 0)
    },
  },
  mutations:{
    setNavList(state,arr){
      state.navList = arr
    }
  },
  actions:{}
}