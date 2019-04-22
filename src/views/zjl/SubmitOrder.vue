<template>
  <div class="submit-order">
    <div class="submit-order-title">
      <h3>填写核对订单信息</h3>
    </div>
    <!-- 收货人信息 -->
    <section class="submit-order-address">
      <div class="title">收货人信息</div>
      <el-radio-group v-model="radio" class="address-list">
        <el-radio :label="item.aId" v-for="item in address" :key="item.aId">
          <div class="address">
            <span class="receiver">{{item.receiver}}</span>
            <span class="address">{{item.province + item.city + item.countyArea + item.detail}}</span>
            <span class="telphone">{{item.cellphone}}</span>
          </div>
          <div class="opreate">
            <el-tooltip class="item" effect="dark" content="编辑" placement="left">
              <el-button type="primary" icon="el-icon-edit" @click="editAddress(item.aId)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="left">
              <el-button type="danger" icon="el-icon-delete" @click="delAddress(item.aId)" circle></el-button>
            </el-tooltip>
          </div>
        </el-radio>
      </el-radio-group>
      <el-button @click="addAdddress" class="add-addr el-icon-circle-plus">添加新地址</el-button>
    </section>
    <AddAddress v-if="flag" @hide="hide" :editAddr="editAddr" :selected="selected" :isWay="isWay"/>

    <!-- 配送及支付方式 -->
    <section class="submit-order-ways">
      <div class="title">配送及支付方式</div>
      <div class="payWay">
        <span>支付方式：</span>
        <span>在线支付</span>
      </div>
      <div class="sendWay">
        <span>配送方式：</span>
        <span>快递运输</span>
        <span>我们将用最快的速度发货（运输费：￥0.00元）</span>
      </div>
    </section>
    <!-- 商品清单 -->
    <section class="submit-order-goodlist">
      <div class="title">商品清单</div>
      <!-- 生订单表头 -->
      <el-row class="good-list-title">
        <el-col :span="12"><div class="grid-content bg-purple delivery-addr">
          <span>收货人：{{getAddr.receiver}}</span> 
          <span>收货地址：{{getAddr.addr}}</span>
          <span>联系电话：{{getAddr.tel}}</span>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top:10px;font-size:14px">
          <span>送达日期：</span>
          <el-date-picker
              v-model="deliveryTime"
              type="date"
              placeholder="选择送达时间">
            </el-date-picker>
          </div></el-col>
      </el-row>
      <!-- 商品清单列表 -->
      <good-list v-for="item in goodList" :key="item.goodsIds" :item="item"/>
    </section>
    <!-- 爱的留言 -->
    <section class="submit-order-message">
      <div class="title">爱的留言</div>
      <el-row class="messages">
        <el-col :span="12"><div class="grid-content bg-purple">
          送礼物前别忘了为收礼人留下你的专属真爱誓言！
          扫码关注，下单后通过语音或文字的形式提交内容，
          收礼人可随时查阅，感受独一无二的专属爱语。
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入200字内容"
            v-model="message" maxlength="200">
          </el-input>
        </div></el-col>
      </el-row>
    </section>
    <el-button type="info" id="submit-order-btn">提交订单</el-button>
    <div id="total-price">总计：￥{{totalPrice}}</div>
  </div>
</template>

<script>
import AddAddress from "@/components/zjl/AddAddress.vue"
import GoodList from '@/components/zjl/goodLists.vue'
import {mapState} from 'vuex'
export default {
  components: {
    AddAddress,
    GoodList
  },
  data() {
    return {
      flag: false, // 添加地址框是否显示
      radio: 1, // 默认选中地址
      address: [
        {
          aId: 1,
          province: '四川省',
          city: '成都市',
          countyArea: '武侯区',
          detail: '六块六六IHII看看',
          receiver: '五七',
          cellphone: '15689623889'
        },
        {
          aId: 2,
          province: '河南省',
          city: '郑州市',
          countyArea: '中原区',
          detail: '六块六六IHII看看',
          receiver: '4651',
          cellphone: '15689623889'
        }
      ],
      editAddr: {}, // 编辑的地址
      selected: [], // select框的绑定值
      isWay: 0, // 0 添加地址add； 1 编辑地址edit
      goodList: [],
      deliveryTime: '',//收货时间
      message: '',
    };
  },
  methods: {
    hide() {
      this.flag = false
    },
    editAddress(id) {
      this.flag = true
      /* this.isWay = 1
      const addr = this.address[id-1]
      this.editAddr = addr
      this.selected = []
      this.selected.push(addr.province, addr.city, addr.countyArea) */
      console.log(id-1,this.selected)
    },
    delAddress(id) {
      this.address.splice(id-1, 1)
    },
    addAdddress() {
      this.flag = true
      // this.isWay = 0
    }
  },
  updated() {

  },
  // 请求数据
  created() {
    /* const userId = sessionStorage.getItem('userId'),
    token = sessionStorage.getItem('token')
    // 获取地址列表
    this.axios.get('/users/'+ userId +'/addresses/list', {
      userId: userId,
      userToken: token
    })
    .then(res => {
      console.log(res)
    }) */
    // 商品清单
    this.goodList = this.submitOrderList
    
  },
  computed: {
    ...mapState('orders',[
      'submitOrderList'
    ]),
    getAddr() {
      const i = this.radio - 1;
      const addr = this.address[i];
      return {receiver: addr.receiver, addr:addr.province + addr.city + addr.countyArea + addr.detail, tel: addr.cellphone}
    },
    totalPrice() {
      let totalPrice = 0
      this.goodList.forEach(item => {
        totalPrice += item.goodsNum * item.goodsPrice
      })
      return totalPrice
    }
  }
};
</script>

<style>
.submit-order {
  width: 900px;
  margin: 0 auto;
}
.submit-order-title {
  text-align: center;
}
.title {
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.el-radio-group {
  padding: 10px 0;
  display: block;
}
label.el-radio {
  display: block;
  margin-right: 0;
  line-height: 40px;
}
.address, .opreate {
  display: inline-block;
}
.opreate {
  float: right;
}

.el-button.is-circle {
  padding: 5px;
}

.sendWay,.payWay {
  font-size: 13px;
  margin-top: 10px;
}
.sendWay span:last-child {
  font-size: 11px;
  margin-left: 50px;
}
.submit-order-ways {
  padding-bottom: 50px;
}
.submit-order-goodlist {
  padding-bottom: 50px;
}
.good-list-title {
  background: rgb(242, 246, 252);
  padding: 20px;
  text-align: center;
}
.delivery-addr {
  text-align: left;
  font-size: 14px;
}
.delivery-addr span { 
  display: block;
}
.submit-order-message {
  border-bottom: 1px solid #eee;
}
.messages {
  padding: 20px;
  height: 200px;
}
#submit-order-btn {
  margin-top: 10px;
  float: right;
  margin-bottom: 30px;
}
#total-price {
  float: right;
  margin-right: 30px;
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
}
</style>
