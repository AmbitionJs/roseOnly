<template>
  <div class="person">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的订单" name="order-lists">
        <Order v-for="order in orderLists" :key="order.orderDetailId" :order="order" @showPay="showPay"/>
        <p v-if="orderLists.length==0">您没有订单！</p>
      </el-tab-pane>
      <el-tab-pane label="退换列表" name="return-lists">
        <Order v-for="(order,index) in returnLists" :key="index" :order="order"/>
        <p v-if="returnLists.length==0">您没有订单！</p>
      </el-tab-pane>
      <el-tab-pane label="申请退换" name="apply-return">
        <Order v-for="(order,index) in applyLists" :key="index+10" :order="order"/>
        <p v-if="applyLists.length==0">您没有订单！</p>
      </el-tab-pane>
      <el-tab-pane label="我的信息" name="user-info">
        <Info/>
      </el-tab-pane>
      <!-- <el-tab-pane label="积分兑换" name="redeem">积分兑换</el-tab-pane> -->
      <el-tab-pane label="收货地址" name="ship-address">
        <ShipAddress/>
      </el-tab-pane>
    </el-tabs>
    <!-- 支付组件 -->
    <orderPay :centerDialogVisible="centerDialogVisible" @cancel="cancel" @getOrderList="getOrderList"/>
  </div>
</template>

<style scoped>
.person {
  margin: 30px 0;
}
.el-tabs__header {
  background: #e8e8e8;
}
</style>


<script>
// 订单组件
import Order from "../../components/hsj/Order.vue";
// 我的信息组件
import Info from "../../components/hsj/Info.vue";
// 收货地址组件
import ShipAddress from "../../components/hsj/ShipAddress.vue";
// 导入 Vuex
import { mapState,mapMutations } from "vuex";

// 支付
import orderPay from '@/components/zjl/orderPay.vue'

export default {
  data() {
    return {
      activeName: "order-lists",
      result: null,
      isResponse: false,
      orderLists: [],
      centerDialogVisible: false,
      tab: 0,
      returnLists: [],
      applyLists: []

    };
  },
  methods: {
    ...mapMutations('orders', ['setPay']),
    handleClick(tab, event) {
      console.log(tab, event);
    },
    ...mapMutations("hsj", ["setOrders"]),
    // 取消支付弹框
    cancel() {
      this.centerDialogVisible = false
    },
    showPay() {
      this.centerDialogVisible = true
    },
    // 获取用户所有订单
    getOrderList() {
      const that = this
      const token = localStorage.getItem('token'),
      userId = localStorage.getItem('userId')
      
      this.axios.get('/orders/client/' + userId +'/list?userToken=' + token + '&&pageNo=' + 1 + '&&pageSize=' + 3)
        .then(function(response) {
          console.log(response)
          if(response.data.data && response.data.data != null) {
            // that.orderLists = response.data.data
            that.setOrders(response.data.data)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    Order,
    Info,
    ShipAddress,
    orderPay
  },
  created() {
    // 获取用户所有订单
    this.getOrderList()
    if(!this.orders) return
    this.orderLists = this.orders
    // 退换列表
    this.returnLists = this.orders.filter(item => {
      if(item.orderDetailStatus == '已退换') {
        return item
      }
    })
    // 退换申请
    this.applyLists = this.orders.filter(item => {
      if(item.orderDetailStatus == '已支付') {
        return item
      }
    })


    // 判断是否有订单号，有就显示，没有就不显示
      const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
      if(orderInfo)
      {
        this.centerDialogVisible = true
        this.setPay(orderInfo)
      }
    
  },
  computed: {
    ...mapState('hsj', ['orders'])
  }
};
</script>

