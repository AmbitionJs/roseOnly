<template>
  <div id="app">
    <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <router-link to=''>
          <img src="@/assets/hjs/testimg/1.jpg" alt="">
          <div>{{typeof(item)+item}}</div>
        </router-link>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
export default {
  data(){
    return {
      imgList:['@/assets/hjs/testimg/1.jpg','@/assets/hjs/testimg/2.jpg','@/assets/hjs/testimg/3.jpg']
    }
  }
}
</script>


<style scoped>
  #app{
    width: 1240px;
    height: 450px;
    margin: 0 auto;
  }
  .el-carousel{
    width: 1240px;
    height: 450px;
    margin: 0 auto;
  }
</style>