<template>
  <div class="order">
    <!-- 订单卡片 -->
    <el-card class="box-card">
      <!-- 订单的 基本信息 和 操作 -->
      <div slot="header" class="clearfix">
        <span>订单编号：{{orderList.orderDetailNo}}</span>
        <span>订单时间: {{orderList.createTime}}</span>
        <span class="detail orderStatus">订单状态：{{orderList.orderDetailStatus}}</span>
        <span>订单金额: {{orderList.orderDetailTotalPrice}}</span>
        <!-- 申请退换 -->
        <el-button type="text" size="mini" v-if="orderList.orderDetailStatus=='已支付'" @click="apply()">申请退换</el-button>
        <!-- 删除订单 -->
        <!-- <el-tooltip class="item" effect="dark" content="删除订单" placement="top" v-if="orderList.orderDetailStatus=='订单完成'">
          <el-button type="text" icon="el-icon-delete" @click="delOrder(orderList.orderDetailNo)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除订单" placement="top" v-if="orderList.orderDetailStatus=='取消订单'">
          <el-button type="text" icon="el-icon-delete" @click="delOrder(orderList.orderDetailNo)"></el-button>
        </el-tooltip> -->
         <el-button type="danger" size="mini" v-if="orderList.orderDetailStatus=='订单完成'" @click="delOrder(orderList.orderDetailNo)">删除订单</el-button>
         <el-button type="danger" size="mini" v-if="orderList.orderDetailStatus=='取消订单'" @click="delOrder(orderList.orderDetailNo)">删除订单</el-button>

        <!-- 等待支付 -->
        <el-button type="danger" size="mini" @click="toPay()" v-if="orderList.orderDetailStatus=='待支付'">等待支付</el-button>
        <!-- 取消订单 -->
        <el-button type="primary" size="mini" @click="cancelPay(orderList.orderDetailNo)" v-if="orderList.orderDetailStatus=='待支付'">取消订单</el-button>
        <!-- 等待收货 -->
        <el-button type="danger" size="mini" @click="confirm(orderList.orderDetailNo)" v-if="orderList.orderDetailStatus=='发货'">等待收货</el-button>
        <!-- 显示订单详细信息 -->
        <el-tooltip class="item" effect="dark" content="显示订单详细信息" placement="bottom">
          <el-button type="text" icon="el-icon-date" @click="dialogTableVisible = true"></el-button>
        </el-tooltip>
      </div>
      <!-- 订单关于商品的信息 -->
      <div class="content" v-for="item in orderList.trolleys" :key="item.trolleyId">
        <router-link :to="'/GoodsDetail/' + item.goods.goodsId"><img :src="'http://172.16.7.76:8080/' + item.goods.pictures[0].picFileUrl" alt="商品图片"></router-link>
        <span class="detail itemName">{{item.goods.goodsName}}</span>
        <span class="detail itemPrice">¥ {{item.goods.goodsPrice}}</span>
        <span class="detail itemCount">x {{item.goodsNum}}</span>
        <span class="detail itemTotalPrice">{{item.totalPrice}}</span>
      </div>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible" class="dialog">
      <!-- 订单信息 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <el-table :data="orderListDetail">
          <el-table-column property="orderDetailNo" label="订单编号"></el-table-column>
          <el-table-column property="orderDetailStatus" label="订单状态"></el-table-column>
          <el-table-column property="payMethod" label="支付方式"></el-table-column>
          <el-table-column property="updateTime" label="消费时间"></el-table-column>
          <el-table-column property="orderDetailTotalPrice" label="订单金额"></el-table-column>
        </el-table>
      </el-card>
      <!-- 收货人信息 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>收货人信息</span>
        </div>
        <el-table :data="shipInfo">
          <el-table-column property="receiver" label="姓名"></el-table-column>
          <el-table-column property="cellphone" label="联系方式"></el-table-column>
          <el-table-column property="detail" label="地址"></el-table-column>
          <el-table-column property="email" label="电子邮件"></el-table-column>
          <el-table-column property="postcode" label="邮编"></el-table-column>
        </el-table>
      </el-card>
      <!-- 配送及物流信息 -->
      <!-- <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>配送及物流信息</span>
        </div>
        <el-table :data="orderListDetail">
          <el-table-column property="deliverMethod" label="配送方式">快递运输</el-table-column>
          <el-table-column property="orderDetailArriveDate" label="送达日期"></el-table-column>
          <el-table-column property="shipmentNumber" label="物流单号"></el-table-column>
          <el-table-column property="shipmentStatus" label="物流状态"></el-table-column>
        </el-table>
      </el-card> -->
      <!-- 购物清单 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>购物清单</span>
        </div>
        <el-table :data="goodsInfo">
          <el-table-column property="goods.pictures[0].picFileUrl" label="商品图">
            <template slot-scope="scope">
                <img :src="'http://172.16.7.76:8080/'+ scope.row.goods.pictures[0].picFileUrl" alt="商品图片">
            </template>
            
          </el-table-column>
          <el-table-column property="goods.goodsName" label="商品名称"></el-table-column>
          <el-table-column property="goods.goodsPrice" label="商品单价"></el-table-column>
          <el-table-column property="goodsNum" label="商品数量"></el-table-column>
          <el-table-column property="vipTotalPrice" label="商品总价"></el-table-column>
        </el-table>
      </el-card>
      <!-- 确认按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {
      dialogTableVisible: false,
      gridData: [],
      results: null,
      orderList: [],
      orderListDetail: [],
      shipInfo: [],
      goodsInfo:[],
      applyMsg: ''
    };
  },
  props: ["order"],
  created() {
    
    if(this.order) {
      this.orderList = this.order
      this.orderListDetail.push(this.order)
      if(this.order.address != null) this.shipInfo.push(this.order.address)
      this.goodsInfo = this.order.trolleys
    }

    console.log(this.goodsInfo)
  },
  methods: {
    ...mapMutations('orders', ['setPay', 'setApplyObj']),
    toPay() {

      let order = {}
      console.log(this.orderList)
        if(this.orderList.orderDetailStatus =='待支付') {
          order.orderDetailNo = this.orderList.orderDetailNo,
          order.orderDetailId = this.orderList.orderDetailId,
          order.totalPrice = this.orderList.orderDetailTotalPrice
        }
        console.log(order)
      this.$emit('showPay')
      this.setPay(order)
    },
    confirm(no) {    
      const token = localStorage.getItem('token')

      this.$confirm('确认收货, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = localStorage.getItem('token')
          this.axios.get('/orders/client/receipt/confirm?orderDetailNo=' + no + '&&userToken=' + token)
            .then(res => {
              this.$emit('getOrderList', this.currentPage)
              console.log(res)
            }).catch(err => {
              console.log(err)
            })

          this.$message({
            type: 'success',
            message: '收货成功!'
          });
        }).catch(() => {
                 
        });
    },
    apply() {

      let order = {}
      console.log(this.orderList)
        if(this.orderList.orderDetailStatus == '已支付') {
          order.orderDetailNo = this.orderList.orderDetailNo,
          order.orderDetailId = this.orderList.orderDetailId
        }
        console.log(order)
      this.$emit('showApply')
      this.setApplyObj(order)
    },
    // 删除订单
    delOrder(no) {
      console.log(no)
      const token = localStorage.getItem('token')
      
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = localStorage.getItem('token')
          this.axios.post('/orders/client/' + no + '/delete', {
              userToken: token,
              orderDetailNo: no
            }).then(res=> {
              console.log(res)
              this.$emit('getOrderList', this.currentPage)
            }).catch(err => {
              console.log(err)
            })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
                 
        });
    },
    // 取消订单
    cancelPay(no) {
      console.log(no)
      this.$confirm('此操作将永久取消该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = localStorage.getItem('token')
          this.axios.get('/orders/client/' + no + '/cancel?orderDetailNo=' + no + '&&userToken=' + token)
          .then(res => {
            this.$emit('getOrderList', this.currentPage)
            console.log(res)
          }).catch(err => {
            console.log(err)
          })

          this.$message({
            type: 'success',
            message: '取消成功!'
          });
        }).catch(() => {
                 
        });
      
    }
  },
  computed: {
    ...mapState('orders', ['currentPage'])
  }
};
</script>


<style>
.text {
  font-size: 14px;
}
/* 
.item {
  margin-bottom: 18px;
} */

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
.el-card__header .clearfix {
  line-height: 40px;
}
.el-card__header span {
  display: inline-block;
  padding: 0 20px;
}
.el-card__header .el-button {
  float: right;
  /* padding: 10px; */
}
.el-button.el-button--mini {
  margin-left: 18px;
  margin-top: 5px;
}
.el-button.el-button--mini span {
  padding: 0;
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