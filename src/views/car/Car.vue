<template>
  <div class="car">
    <div class="car-title">
      <div class="car-title-left">
        <span>我的购物车</span>
      </div>
      <div class="car-title-right">
        <a href=""><i class="el-icon-delete"></i>清空购物车</a>
      </div>
    </div>
    <CarList />
  </div>
</template>

<script>
import CarList from '@/components/car/CarList'

export default {
  name: 'car',
  compenents: {
    CarList
  }
}
</script>

<style>
.car {
  width: 900px;
  margin: 0 auto;
}
.car-title {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
}
.car-title-left {
  float: left;
}
.car-title-right {
  float: right;
}
.car-title-left span {
  font-size: 18px;
  font-weight: bold;
}
</style>

