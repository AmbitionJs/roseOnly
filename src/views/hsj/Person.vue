<template>
  <div class="person">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的订单" name="order-lists">
        <Order v-for="order in orders" :key="order.orderDetailId" :order="order"/>
      </el-tab-pane>
      <el-tab-pane label="退换列表" name="return-lists">
        <Order v-for="i in 10" :key="i"/>
      </el-tab-pane>
      <el-tab-pane label="申请退换" name="apply-return">申请退换</el-tab-pane>
      <el-tab-pane label="我的信息" name="user-info">
        <Info/>
      </el-tab-pane>
      <el-tab-pane label="积分兑换" name="redeem">积分兑换</el-tab-pane>
      <el-tab-pane label="收货地址" name="ship-address">
        <ShipAddress/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 订单组件
import Order from "../../components/hsj/Order.vue";
// 我的信息组件
import Info from "../../components/hsj/Info.vue";
// 收货地址组件
import ShipAddress from "../../components/hsj/ShipAddress.vue";
// 导入 Vuex
import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeName: "order-lists",
      result: null,
      isResponse: false,
      orders: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    ...mapMutations('hsj', {
      setOrders: 'setOrders'
    })
  },
  components: {
    Order,
    Info,
    ShipAddress
  },
  created() {
    const that = this
    // 获取用户所有订单
    this.axios({
      method: "get",
      url: "/users"
    })
      .then(function(response) {
        that.orders = response.data.data
        console.log('orders is', that.orders)
        that.setOrders(that.orders)
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
</script>

