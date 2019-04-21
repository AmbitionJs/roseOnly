<template>
  <div class="submit-order">
    <div class="submit-order-title">
      <h3>填写核对订单信息</h3>
    </div>
    <!-- 收货人信息 -->
    <section class="submit-order-address">
      <div class="title">收货人信息</div>
      <el-radio-group v-model="radio" class="address-list">
        <el-radio :label="item.aId" v-for="item in address" :key="item.aId" @change="getId($event)">
          <div class="address">
            <span class="receiver">{{item.receiver}}</span>
            <span class="address">{{item.province + item.city + item.countyArea + item.detail}}</span>
            <span class="telphone">{{item.cellphone}}</span>
          </div>
          <div class="opreate">
            <el-tooltip class="item" effect="dark" content="编辑" placement="left">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="left">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
          </div>
        </el-radio>
      </el-radio-group>
      <el-button size="mini" @click="flag = !flag">添加新地址</el-button>
    </section>
    <AddAddress v-if="flag" @flag="flag1"/>
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
    </section>
    <!-- 爱的留言 -->
    <section class="submit-order-message">
      <div class="title">爱的留言</div>
    </section>
    <el-button type="info">提交订单</el-button>
  </div>
</template>

<script>
import AddAddress from "@/components/zjl/AddAddress.vue"
export default {
  components: {
    AddAddress
  },
  data() {
    return {
      flag: false,
      radio: 1,
      address: [
        {
          aId: 1,
          province: '上海',
          city: '上海市',
          countyArea: '黄浦区',
          detail: '六块六六IHII看看',
          receiver: '4651',
          cellphone: '15689623889'
        },
        {
          aId: 2,
          province: '上海',
          city: '上海市',
          countyArea: '黄浦区',
          detail: '六块六六IHII看看',
          receiver: '4651',
          cellphone: '15689623889'
        }
      ]
    };
  },
  methods: {
    flag1() {
       this.flag = false
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
</style>
