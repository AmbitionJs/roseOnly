<template>
  <div class="cart">
    <div class="cart-title">
      <div class="cart-title-left">
        <span>我的购物车</span>
      </div>
      <div class="cart-title-right">
        <a href="javascript:;" class="cart-clear-btn" @click="clearCart()">
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
        <tr v-for="item in cardatas" :key="item.goodsIds">
          <td>
            <input type="checkbox" :checked="item.select" @click="item.select=!item.select">
          </td>
          <td>roseonly</td>
          <td>
            <img :src="item.picFileUrl" alt>
            <span>{{item.goodsName}}</span>
          </td>
          <td>￥{{item.goodsPrice}}</td>
          <td>
            <div class="number-group">
              <span class="el-icon-remove-outline" @click="reduceNum(item.goodsIds)"></span>
              <input
                type="text"
                v-model="item.goodsNum"
                class="good-number"
                @change="changeNum(item.goodsIds)"
              >
              <span class="el-icon-circle-plus-outline" @click="addNum(item.goodsIds)"></span>
            </div>
          </td>
          <td>
            <span class="del-shopping-list" @click="deleteList(item.goodsIds)">删除</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="cart-footer">
      <div class="cart-footer-left">
        <input
          type="checkbox"
          id="select-all"
          @change="selectAll(isSelectAll)"
          :checked="isSelectAll"
        >
        <label for="select-all">全选</label>
      </div>
      <div class="cart-footer-right">
        <div class="total-price">
          合计：￥
          <span>{{getTotal}}</span>
        </div>
        <button type="button" id="settlement" @click="settlement">去结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      cardatas: [
        {
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
        }
      ]
    };
  },
  created() {
    // 获取购物车数据
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (token) {
      this.axios
        .get("/trolley/" + userId, {
          userId: userId,
          userToken: token
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    // 删除单个购物车商品
    deleteList(id) {
      var goodsIds = [];
      if (id) {
        goodsIds.push(id);
      }
      console.log(goodsIds);
      const token = sessionStorage.getItem("token");
      if (token) {
        this.axios
          .post("/trolley/delete", {
            goodsIds: goodsIds,
            userToken: token
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.cardatas.forEach((item,index) => {
        if(item.goodsIds == id) {
          this.cardatas.splice(index, 1)
        }
      })
    },
    // 清空购物车
    clearCart() {
      this.cardatas = []
      const token = sessionStorage.getItem("token");
      if (token) {
        this.axios
          .post("/trolley/delete", {
            userToken: token
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 增加商品数量
    addNum(id) {
      var num;
      this.cardatas.forEach(item => {
        if (item.goodsIds == id) {
          item.goodsNum++;
          num = item.goodsNum;
        }
      });
      console.log(num);
      // const token = sessionStorage.getItem("token")
      // this.axios.post('/trolley/add', {
      //   goodsId: id,
      //   goodsNum: num,
      //   userToken: token
      // })
    },
    // 减少商品数量
    reduceNum(id) {
      var num;
      this.cardatas.forEach(item => {
        if (item.goodsIds == id) {
          if (item.goodsNum == 1) {
            num = item.goodsNum;
            return;
          }
          item.goodsNum--;
          num = item.goodsNum;
        }
      });
      console.log(num);
      // const token = sessionStorage.getItem("token")
      // this.axios.post('/trolley/add', {
      //   goodsId: id,
      //   goodsNum: num,
      //   userToken: token
      // })
    },
    // 输入商品数量
    changeNum(id) {
      var num;
      this.cardatas.forEach(item => {
        if (item.goodsIds == id) {
          if (item.goodsNum <= 0) {
            item.goodsNum = 1;
          }
          num = item.goodsNum;
        }
      });
      console.log(num);
      // const token = sessionStorage.getItem("token")
      // this.axios.post('/trolley/add', {
      //   goodsId: id,
      //   goodsNum: num,
      //   userToken: token
      // })
    },
    // 全选/取消全选
    selectAll(_isSelect) {
      this.cardatas.forEach(item => {
        item.select = !_isSelect;
      });
    },
    // 结算
    settlement() {
      var ids = [],token = sessionStorage.getItem('token')
      this.cardatas.forEach(item => {
        if (item.select) {
          ids.push(item.goodsIds);
        }
      });
      console.log(ids);
      this.axios.post('/trolley/settlement', {
        trolleyIds: ids,
        userToken: token
      })
      .then(res => {
        if(res.state == 200) {
          this.$router.push('/submitOrder')
        }
      })
    }
  },
  computed: {
    // 检测是否全选
    isSelectAll() {
      return this.cardatas.every(item => {
        return item.select;
      });
    },
    getTotal() {
      // 获取cardatas中select为true的数据
      var items = this.cardatas.filter(item => {
          if (item.select) return item;
        }),
        totalPrice = 0;
      // 计算总价
      items.forEach(item => {
        totalPrice += item.goodsPrice * item.goodsNum;
      });
      return totalPrice;
    }
  },
  mounted() {
    var _this = this;
    //为cardatas添加select（是否选中）字段，初始值为true
    this.cardatas.map(function(item) {
      _this.$set(item, "select", true);
    });
  }
};
</script>

<style>
.cart {
  width: 968px;
  min-width: 768px;
  margin: 0 auto;
  user-select: none;
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
tr:not(:first-child) {
  line-height: 80px;
}
.good-number {
  width: 100px;
  text-align: center;
}
th,
td {
  padding: 10px;
}
.number-group {
  user-select: none;
}
.number-group span {
  padding: 10px;
  cursor: pointer;
}
.del-shopping-list {
  padding: 10px 0;
}
.del-shopping-list:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
