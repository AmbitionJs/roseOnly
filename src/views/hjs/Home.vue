<template>
  <div id="homeApp">
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="(item,index) in homeLB" :key="index">
        <router-link :to="'/goodsDetail/'+ item.goodsId">
          <img :src="'http://172.16.7.76:8080/'+ item.picUrl" alt="" >
        </router-link>
      </el-carousel-item>
    </el-carousel>

    <!-- 列表图 -->
    <div v-for="(item,index) in homeLP" :key="index" class="picList">
      <router-link :to="'/goodsDetail/'+ item.goodsId">
        <img :src="'http://172.16.7.76:8080/'+ item.picUrl" alt="" >
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters } from 'vuex'


export default {
  name:'home',
  data(){
    return {
      homeLB:[], // 主页轮播图
      homeLP:[]  // 主页列表图
    }
  },
  computed:{
    // ...mapGetters('hjs',['getHomeLB'])
  },
  created(){
    // console.log('主页created执行了一次')
    this.axios.get('/goods/client/search/all/list')
     .then(res => {
       for(let i = 0;i < res.data.data.length;i++){
         for(let j = 0;j < res.data.data[i].pictures.length;j++){
           // 找到后台返回数据中的轮播图
           if(res.data.data[i].pictures[j].picCode == 0){
             this.homeLB.push({
               picUrl:res.data.data[i].pictures[j].picFileUrl,
               goodsId:res.data.data[i].goodsId
               })
              console.log('轮播图:',res.data.data[i].goodsId)
           }
           // 找到后台返回数据中的主页列表图
           if(res.data.data[i].pictures[j].picCode == 1){
             this.homeLP.push({
               picUrl:res.data.data[i].pictures[j].picFileUrl,
               goodsId:res.data.data[i].goodsId
               })
             console.log('主页列表图:',res.data.data[i].pictures[j].picFileUrl)
           }
         }
       }
     })
     .catch(err => {
       console.log('出错信息:',err)
     })
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
.picList img{
  width: 100%;
  height: auto;
}
</style>
