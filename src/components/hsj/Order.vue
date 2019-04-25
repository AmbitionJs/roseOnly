<template>
  <div class="order">
    <!-- 订单卡片 -->
    <el-card class="box-card">
      <!-- 订单的 基本信息 和 操作 -->
      <div slot="header" class="clearfix">
        <span>订单编号: {{ order.orderDetailNo }}</span>
        <span>订单时间: 2019-03-12 16:40</span>
        <el-tooltip class="item" effect="dark" content="显示订单详细信息" placement="bottom">
          <el-button type="text" icon="el-icon-date" @click="dialogTableVisible = true"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除订单" placement="top">
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </div>
      <!-- 订单关于商品的信息 -->
      <div class="content">
        <img src="../../../public/test.png" alt="商品图片">
        <span class="detail itemName">{{ gridData[0].itemName }}</span>
        <span class="detail itemPrice">¥ {{ gridData[0].itemPrice }}</span>
        <span class="detail itemCount">x {{ gridData[0].itemCount }}</span>
        <span class="detail itemTotalPrice">{{ gridData[0].itemTotalPrice }}</span>
        <span class="detail orderStatus">{{ gridData[0].orderStatus }}</span>
        <el-button type="text">申请退换</el-button>
      </div>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible" class="dialog">
      <!-- 订单信息 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <el-table :data="gridData">
          <el-table-column property="orderNumber" label="订单编号"></el-table-column>
          <el-table-column property="orderStatus" label="订单状态"></el-table-column>
          <el-table-column property="payMethod" label="支付方式"></el-table-column>
          <el-table-column property="consumptionTime" label="消费时间"></el-table-column>
        </el-table>
      </el-card>
      <!-- 收货人信息 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>收货人信息</span>
        </div>
        <el-table :data="gridData">
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="tel" label="联系方式"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
          <el-table-column property="email" label="电子邮件"></el-table-column>
          <el-table-column property="zip" label="邮编"></el-table-column>
        </el-table>
      </el-card>
      <!-- 配送及物流信息 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>配送及物流信息</span>
        </div>
        <el-table :data="gridData">
          <el-table-column property="deliverMethod" label="配送方式"></el-table-column>
          <el-table-column property="deliverDate" label="送达日期"></el-table-column>
          <el-table-column property="shipmentNumber" label="物流单号"></el-table-column>
          <el-table-column property="shipmentStatus" label="物流状态"></el-table-column>
        </el-table>
      </el-card>
      <!-- 购物清单 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>购物清单</span>
        </div>
        <el-table :data="gridData">
          <el-table-column property="itemImg" label="商品图">
            <img src="../../../public/test.png" alt="商品图片">
          </el-table-column>
          <el-table-column property="itemName" label="商品名称"></el-table-column>
          <el-table-column property="itemPrice" label="商品单价"></el-table-column>
          <el-table-column property="itemCount" label="商品数量"></el-table-column>
          <el-table-column property="itemTotalPrice" label="商品总价"></el-table-column>
        </el-table>
      </el-card>
      <!-- 确认按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.order {
  margin: 0 0 20px 0;
}
.box-card {
  width: 99%;
}
.content img {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.el-card__header {
  color: #666;
  border: 1px solid #f0f0f0;
  background: #666;
  background: #f2f2f2;
  font-size: 13px;
}
.el-card__header span {
  display: inline-block;
  padding: 0 20px;
}
.el-card__header .el-button {
  float: right;
  padding: 0 10px;
}
.el-card__body img,
.el-card__body span {
  vertical-align: middle;
}
.el-card__body span {
  padding: 0 30px;
}
.el-card__body .detail {
  font-size: 13px;
}
.dialog .box-card {
  margin: 0 0 10px 0;
}
.el-dialog {
  width: 90%;
}
.el-table__body-wrapper .el-table__row .cell img {
  width: 80px;
  height: 80px;
}
</style>

<script>
// 导入 Vuex
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialogTableVisible: false,
      gridData: [
        {
          orderNumber: "2019031216408152",
          orderStatus: "已完成",
          payMethod: "在线支付",
          consumptionTime: "2019-3-12",
          name: "张三",
          tel: "13131313131",
          address: "重庆 天津市 北辰区",
          email: "13131313131@163.com",
          zip: "300134",
          deliverMethod: "平邮",
          deliverDate: "2019-3-13",
          shipmentNumber: "9817298718651",
          shipmentStatus: "收货",
          itemName: "白色情人节-白色情人节特别款-19支-长形80CM",
          itemPrice: "1000",
          itemCount: "3",
          itemTotalPrice: "3000"
        }
      ],
      results: null
    };
  },
  created() {},
  props: ["order"]
};
</script>


