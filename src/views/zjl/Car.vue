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
          <th style="margin-left: 100px;">品牌</th>
          <th style="margin-left: 100px;">商品名称</th>
          <th style="margin-left: 80px;">单价</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
        <tr v-if="cartDatas.length == 0">
          <div>购物车没有商品，
          <router-link to="/Category/1">去添加</router-link></div>
        </tr>
        <tr v-for="item in cartDatas" :key="item.goods.goodsId">
          <td>
             <el-checkbox v-model="item.select"></el-checkbox>
          </td>
          <td><span>{{item.goods.goodsBrand}}</span></td>
          <td>
            <img :src="'http://172.16.7.76:8080/' + item.goods.pictures[0].picLinkUrl" alt>
            <span>{{item.goods.goodsName}}</span>
          </td>
          <td><span>￥{{item.goods.goodsPrice}}</span></td>
          <td>
            <div class="number-group">
              <el-input-number size="mini" v-model="item.goodsNum" @change="changeNum(item.goods.goodsId)" :min="1" :max="10"></el-input-number>
            </div>
          </td>
          <td>
            <!-- <span class="del-shopping-list" @click="deleteList(item.goodsIds)">删除</span> -->
            <el-button type="danger" icon="el-icon-delete" @click="deleteList(item.trolleyId)" size="mini" circle></el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="cart-footer">
      <div class="cart-footer-left">
        <el-checkbox v-model="isSelectAll" @change="selectAll(isSelectAll)">全选</el-checkbox>
      </div>
      <div class="cart-footer-right">
        <div class="total-price">
          合计：￥
          <span>{{getTotal}}</span>
        </div>
        <button type="button" id="settlement" @click="settlement">去结算</button>
      </div>
    </div>
    <div class="order-assist">
      <p>订单帮助</p>
      <p>热线电话：400-1314-520</p>
      <p>客服邮箱：service@roseonly.com  客服工作时间：周一至周日9:00-21:00</p>
      <p>如果您在下单过程中遇到问题，请与我们联系。因为鲜花商品对配送时效有特殊要求，订购后请随时登录查询物流状态。</p>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import '@/assets/zjl/js/formatDate.js'
export default {
  name: "cart",
  data() {
    return {
      cartDatas: []
    };
  },
  created() {
    this.getCarDatas()
  },
  methods: {
    ...mapMutations('orders',[
      'cartOrders'
    ]),
    getCarDatas() {
        // 获取购物车数据
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token) {
        this.axios.get("/trolley/" + userId + '?userToken=' + token)
          .then(res => {
            console.log(res, res.data.data);
            if(res.data.data && res.data.data != null) {
              this.cartDatas = res.data.data
            } else {
              this.carDatas = []
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 删除单个购物车商品
    deleteList(id) {
      var ids = id.toString()
      
      console.log(ids);
      const token = localStorage.getItem("token");
      if (token) {
        this.axios.post('/trolley/delete', {
          trolleyIds: ids,
          userToken: token
        })
          .then(res => {
            console.log(res);
            this.getCarDatas()
          })
          .catch(err => {
            console.log(err);
          });
      }

    },
    // 清空购物车
    clearCart() {
      const token = localStorage.getItem("token");
      if (token) {
        this.axios.post("/trolley/delete", {
          userToken: token
        })
          .then(res => {
            console.log(res);
            this.getCarDatas()
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 输入商品数量
    changeNum(id) {
      console.log(id)
      var num;
      this.cartDatas.forEach(item => {
        if (item.goods.goodsId == id) {
          num = item.goodsNum;
        }
      });
      console.log(num);
      const token = localStorage.getItem("token")
      this.axios.post('/trolley/add', {
        goodsId: id,
        goodsNum: num,
        userToken: token
      })
      .then(res => {
        console.log(res)
        this.getCarDatas()
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 全选/取消全选
    selectAll(_isSelect) {
      this.cartDatas.forEach(item => {
        item.select = !_isSelect;
      });
    },
    // 结算
    settlement() {
      var ids = [],token = localStorage.getItem('token')
      console.log(this.cartDatas)
      this.cartDatas.forEach(item => {
        if (item.select) {
          var id = item.trolleyId
          ids.push(id.toString())
          console.log(ids) 
        }
      });
      console.log(ids.join(','))
      console.log(ids) 
      if(ids.length == 0) {
        this.errorAlert('您没有选中商品！')
      } else {
        console.log(1)
        this.axios.post('/trolley/settlement', {
          trolleyIds: ids.join(','),
          userToken: token
        })
        .then(res => {
          console.log(res)
          if(res.status == 200) {
            this.$router.push('/submitOrder')
            // this.cartOrders(res.data.data)
            sessionStorage.setItem('submitOrders', JSON.stringify(res.data.data))
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
      
    },
    errorAlert(msg) {
      this.$alert(msg, '警告', {
        confirmButtonText: '去添加',
        center: true,
        type: 'error'
      }).then(()=>{

      }).catch(()=> {})
    }
  },
  computed: {
    ...mapState('orders',['submitOrderList']),
    // 检测是否全选
    isSelectAll: {
      get() {
        return this.cartDatas.every(item => {
          return item.select;
        })
      },
      set(val) {
        console.log(val)
      }
    },
    getTotal() {
      // 获取cartDatas中select为true的数据
      var items = this.cartDatas.filter(item => {
          if (item.select) return item;
        }),
        totalPrice = 0;
      // 计算总价
      items.forEach(item => {
        totalPrice += item.goods.goodsPrice * item.goodsNum;
      });
      return Math.floor(totalPrice * 100) / 100
    }
  },
  mounted() {
    var _this = this;
    //为cartDatas添加select（是否选中）字段，初始值为true
    this.cartDatas.map(function(item) {
      _this.$set(item, "select", true);
    });
  }
};
</script>

<style scoped>
.cart {
  width: 968px;
  min-width: 768px;
  margin: 0 auto;
  color: #414141;
  user-select: none;
  padding: 50px;
}
.cart-title {
  overflow: hidden;
  line-height: 40px;
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
  color: #000;
  opacity: 0.5;
  font-weight: bold;
}
.cart-clear-btn:hover {
  opacity: 1;
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
  border-top: 1px solid #ebeef5;
  text-align: center;
}
tr {
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
}
tr:not(:first-child),
td {
  line-height: 95px;
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
/* .number-group span {
  padding: 10px;
  cursor: pointer;
} */
.del-shopping-list {
  padding: 10px 0;
}
.del-shopping-list:hover {
  text-decoration: underline;
  cursor: pointer;
}
.order-assist p {
  margin: 0;
}
.order-assist p:not(:first-child) {
  font-size: 13px;
}
table tr td img {
  width: 100px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
}
</style>
