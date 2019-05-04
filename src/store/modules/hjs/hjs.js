export default {
  namespaced:true,
  state:{
    navList:[],
    sIsLogin:false
  },
  getters:{
    // 获得一级列表
    getFirstNavList:(state) => {
      return state.navList.filter(todo => todo.goodsTypeSuperior === -1)
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
    },
    
    // 改变登录状态
    changeLoginState(state,il){
      console.log('修改登录状态成功',il)
      state.sIsLogin = il
      console.log(state.sIsLogin)
    }
  },
  actions:{}
}