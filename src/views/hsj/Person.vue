<template>
  <div class="person">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的订单" name="order-lists">
        <Order v-for="i in 10" :key="i"/>
      </el-tab-pane>
      <el-tab-pane label="退换列表" name="return-lists">
        <Order v-for="i in 10" :key="i"/>
      </el-tab-pane>
      <el-tab-pane label="申请退换" name="apply-return">申请退换</el-tab-pane>
      <el-tab-pane label="我的信息" name="user-info">
        <Info />
      </el-tab-pane>
      <el-tab-pane label="积分兑换" name="redeem">积分兑换</el-tab-pane>
      <el-tab-pane label="收货地址" name="ship-address">
        <ShipAddress />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 订单组件
import Order from "../../components/hsj/Order.vue"
// 我的信息组件
import Info from '../../components/hsj/Info.vue'
// 收货地址组件
import ShipAddress from '../../components/hsj/ShipAddress.vue'
export default {
  data() {
    return {
      activeName: "order-lists"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    Order,
    Info,
    ShipAddress
  }
};
</script>

