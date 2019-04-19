<template>
  <div class="order">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单编号: 2019031216408152</span>
        <span>订单时间: 2019-03-12 16:40</span>
        <el-button type="text" icon="el-icon-date"></el-button>
        <el-button type="text" icon="el-icon-delete"></el-button>
      </div>
      <div class="content">
        <img src="../../../public/test.png" alt="商品图片">
        <span class="detail title">白色情人节-白色情人节特别款-19支-长形80CM</span>
        <span class="detail price">¥ 1000</span>
        <span class="detail count-number">x 3</span>
        <span class="detail total-price">x 3000</span>
        <span class="detail status">交易完成</span>
      </div>
    </el-card>
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
</style>

