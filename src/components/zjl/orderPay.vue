<template>
  <el-dialog
  title="支付"
  :visible.sync="centerDialogVisible"
  width="60%"
  center>
  <span></span>
  <div class="item">
    <p>您的订单是：<span>{{orderDetailNo}}</span></p>
    <p>支付金额：<span>￥{{totalPrice}}</span></p>
    <p>我们建议您尽快完成付款，如果12小时内未完成付款，系统将自动取消该订单。</p>
    <p>如果您在网上支付中遇到任何问题，请拨打客服热线：400-1314-520 咨询。</p>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelPay">取 消</el-button>
    <el-button type="primary" @click="pay">支付</el-button>
  </span>
  </el-dialog>

</template>

<script>
import {mapState} from 'vuex'
  export default {
    props: ['centerDialogVisible'],
    data() {
      return {
        orderDetailNo: '',
        totalPrice: ''
      };
    },
    created() {
      if(this.payObj) {
        this.orderDetailNo = this.payObj.orderDetailNo
        this.totalPrice = this.payObj.totalPrice
      }
    },
    methods: {
      pay() {
        const token = localStorage.getItem('token')
        //       orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
        this.axios.post('/orders/client/accounts/pay', {
          orderDetailNo: this.payObj.orderDetailNo,
          orderDetailId: this.payObj.orderDetailId,
          userToken: token
        })
        .then(res => {
          console.log(res)
          sessionStorage.clear()
          this.$emit('cancel')
          this.$emit('getOrderList')

          var socket = new WebSocket("ws://172.16.7.76:9999");

          socket.addEventListener("open", function() {
            console.log("连接成功");
            var obj = new Object()
            obj.from = 'user'
            obj.content = "新订单"
            obj.to = "Admin"
            
            socket.send(JSON.stringify(obj));
            // console.log(obj);
          });

          // socket.addEventListener("message", function(e) {
          //   console.log(e)
          //   let data = JSON.parse(e.data.split('\\').join(''))
          //   that.$notify({
          //     title: "系统消息",
          //     message: data.content,
          //     duration: 60*1000
          //   });
          //   // e.data.split('/').join('')
          //   console.log(12,data,e);
          // });
          socket.addEventListener("close", function() {
            console.log("连接已经断开");
          });
          socket.addEventListener("error", function() {
            console.log("连接异常");
          });

        })
        .catch(err => {
          console.log(err)
        })
      },
      cancelPay() {
        this.$emit('cancel')
        sessionStorage.clear()
      }
    },
    computed: {
      ...mapState('orders', ['payObj'])
    }
  };
</script>

<style scoped>
.item span {
  font-weight: bold!important
}
.item p:nth-child(3) {
  margin-top: 20px;
}
</style>



