<template>
  <div class="submit-order-address">
    <div class="title">收货人信息</div>
    <!-- <div class="address-list">
      <div class="item">
        <span class="check-address">
           <el-radio  label=""></el-radio>
        </span>
        <span class="receiver">{{address.receiver}}</span>
        <span class="address">{{address.province + address.city + address.countyArea + address.detail}}</span>
        <span class="telphone">{{address.cellphone}}</span>
      </div>
      <div class="opreate">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </div> -->
    <el-radio-group v-model="radio">
      <el-radio :label="item.aId" v-for="item in address" :key="item.aId">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
}
</script>

<style>
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
