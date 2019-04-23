<template>
  <div id="homeApp">
    <Nav />
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <router-link to=''>
          <img src="@/assets/hjs/testimg/1.jpg" alt="">
          <div>{{typeof(item)+item}}</div>
        </router-link>
      </el-carousel-item>
    </el-carousel>

    <p style="height:2000px" title="这里面是写内容的">{{navList}}</p>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/hjs/Navigation.vue'
import Carousel from '@/components/hjs/Carousel.vue'
import Footer from '@/components/hjs/Footer.vue'
import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'

export default {
  name:'home',
  data(){
    return {
      imgList:['@/assets/hjs/testimg/1.jpg','@/assets/hjs/testimg/2.jpg','@/assets/hjs/testimg/3.jpg']
    }
  },
  components:{
    Nav,
    Carousel,
    Footer,
  },
  computed:{
    ...mapState('hjs',['navList'])
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
  background: #414141;
}
.el-carousel{
  width: 1240px;
  height: 450px;
  margin: 0 auto;
}
</style>
