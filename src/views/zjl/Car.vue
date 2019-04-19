<template>
  <div class="cart">
    <div class="cart-title">
      <div class="cart-title-left">
        <span>我的购物车</span>
      </div>
      <div class="cart-title-right">
        <a href class="cart-clear-btn" @click="deleteCar()">
          <i class="el-icon-delete"></i>
          <span>清空购物车</span>
        </a>
      </div>
    </div>
    <div class="shopping-list">
      <table>
        <tr>
          <th></th>
          <th>品牌</th>
          <th>商品名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in cardatas" :key="item.carId">
          <td>
            <input type="checkbox">
          </td>
          <td>{{item.brand}}</td>
          <td>
            <img src alt>
            <span>{{item.goodname}}</span>
          </td>
          <td>￥{{item.price}}</td>
          <td>
            <div class="number-group">
              <span class="el-icon-remove-outline" ></span>
              <input type="text" v-model="item.number" class="good-number">
              <span class="el-icon-circle-plus-outline" @click="addNum(item.goodsIds)"></span>
            </div>
          </td>
          <td>
            <a href="" class="del-shopping-list" @click="deleteCar(item.goodsIds)">删除</a>
          </td>
        </tr>
      </table>
    </div>
    <div class="cart-footer">
      <div class="cart-footer-left">
        <input type="checkbox" id="check-all">
        <label for="check-all">全选</label>
      </div>
      <div class="cart-footer-right">
        <div class="total-price">
          合计：￥
          <span>{{totalPrice}}</span>
        </div>
        <button type="button" id="settlement">去结算</button>
      </div>
    </div>
  </div>
</template>

<script>
// import ShoppingList from "@/components/zjl/ShoppingList.vue"
// import { constants } from 'crypto'

export default {
  name: "cart",
  data() {
    return {
      totalPrice: "",
      cardatas: [
        {
          carId: 1,
          brand: "roseonly",
          goodname: "玫瑰公仔-项圈狗手链与甜心狗",
          url: "",
          price: 1999,
          number: 1
        },
        {
          carId: 2,
          brand: "roseonly",
          goodname: "玫瑰公仔-项圈狗手链与甜心狗",
          url: "",
          price: 1999,
          number: 1
        }
      ]
    }
  },
  created() {
    // 获取购物车数据
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("userId")
    if(token) {
      this.axios.get("/trolley/" + userId, {
        userId: userId,
        userToken: token
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    // 清空购物车或删除单个
    deleteCar(id) {
      var goodsIds = []
      if (id) {
        goodsIds.push(id)
      }
      console.log(id, goodsIds)
      const token = sessionStorage.getItem("token")
      if(token) {
        this.axios.post("/trolley/delete", {
          goodsIds: goodsIds,
          userToken: token
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    addNum(id) {
      var num = ''
      const token = sessionStorage.getItem("token")
      this.axios.post('/trolley/add', {
        goodsId: id,
        goodsNum: num,
        userToken: token
      })
    },
    reduceNum(id) {
      var num = ''
      const token = sessionStorage.getItem("token")
      this.axios.post('/trolley/add', {
        goodsId: id,
        goodsNum: num,
        userToken: token
      })
    },
    checkAll() {
      
    }
  },
  computed: {
    // getTotal() {

    // }
  },
  mounted: function () {
    var _this = this
    //为cardatas添加select（是否选中）字段，初始值为true
    this.cardatas.map(function (item) {
      _this.$set(item, 'select', true)
    })
  }
}
</script>

<style>
.cart {
  width: 968px;
  min-width: 768px;
  margin: 0 auto;
}
.cart-title-left {
  color: #414141;
  font-size: 22px;
  overflow: hidden;
}
.cart-title-left,
.cart-footer-left {
  float: left;
}
.cart-title-right,
.cart-footer-right {
  float: right;
}
.cart-title-right i {
  margin-right: 5px;
}
.cart-title-right span {
  font-size: 14px;
}
.cart-clear-btn {
  text-decoration: none;
  color: #414141;
}
.cart-clear-btn:hover {
  color: #000;
  font-weight: bold;
}
.cart-footer {
  padding: 10px;
  line-height: 40px;
  overflow: hidden;
}
#settlement {
  width: 110px;
  height: 40px;
  background: #c71f2c;
  color: #fff;
  border: none;
  outline: none;
  font-size: 18px;
  cursor: pointer;
}
.total-price {
  display: inline-block;
  margin-right: 20px;
  font-size: 20px;
  color: #414141;
}
table {
  width: 100%;
}
table {
  border-top: 1px solid #000;
  text-align: center;
}
tr {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
}
.good-number {
  width: 100px;
  text-align: center;
}
th,
td {
  padding: 10px;
}
.number-group span {
  padding: 10px;
  cursor: pointer;
}
</style>
