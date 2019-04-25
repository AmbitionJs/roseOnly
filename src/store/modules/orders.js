import mutations from './orders/mutations'

const state = {
  submitOrderList: [{
    goodsIds: 1,
    brand: "roseonly",
    goodsName: "玫瑰公仔-项圈狗手链与甜心狗",
    picFileUrl: "",
    goodsPrice: 1999,
    goodsNum: 1
  },
  {
    goodsIds: 2,
    brand: "roseonly",
    goodsName: "玫瑰公仔-项圈狗手链与甜心狗",
    picFileUrl: "",
    goodsPrice: 1999,
    goodsNum: 1
  },
  {
    goodsIds: 3,
    brand: "roseonly",
    goodsName: "玫瑰公仔-项圈狗手链与甜心狗",
    picFileUrl: "",
    goodsPrice: 1999,
    goodsNum: 1
  },
  {
    goodsIds: 4,
    brand: "roseonly",
    goodsName: "玫瑰公仔-项圈狗手链与甜心狗",
    picFileUrl: "",
    goodsPrice: 2999,
    goodsNum: 2
  }],
}

export default {
  namespaced:true,
  state,
  mutations
}