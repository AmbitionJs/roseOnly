<template>
  <div class="good-lists-item">
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">
        <router-link to="/">
          <img :src="item.picFileUrl" alt="" class="good-img">
        </router-link>  
      </div></el-col>
      
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <span>商品名称：</span>
        <span>{{item.goodsName}}</span>
      </div></el-col>

      <el-col :span="4"><div class="grid-content bg-purple">
      <span>商品数量：</span> 
      <span>{{item.goodsNum}}</span> 
      </div></el-col>

      <el-col :span="4"><div class="grid-content bg-purple-light">
      <span>商品单价：</span>  
      <span>{{item.goodsPrice}}</span>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.good-lists-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  /* line-height: 100px; */
}
.good-lists-item:last-child {
  border-bottom: none;
}
.good-lists-item .good-img {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
