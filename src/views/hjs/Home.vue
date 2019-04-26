<template>
  <div id="homeApp">
    <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="item in getHomeLB" :key="item.id">
        <router-link :to="'/Category/'+item.goodsTypeId">
          <img :src="item.picFileUrl" alt="" >
        </router-link>
      </el-carousel-item>
    </el-carousel>

    <p style="height:2000px" title="这里面是写内容的">daffdaf</p>
  </div>
</template>

<script>
import {mapGetters } from 'vuex'


export default {
  name:'home',
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters('hjs',['getHomeLB'])
  },
  created(){
    /* this.axios.get('/goods/client/search/all/list')
     .then(res => {
       console.log(res.data.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     }) */
  }
}
</script>


<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,li{
  list-style: none;
}
#homeApp{
  background: #fff;
}
.el-carousel{
  width: 1240px;
  height: 450px;
  margin: 0 auto;
}
</style>
