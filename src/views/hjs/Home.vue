<template>
  <div id="homeApp">
    <Nav />
    <Carousel />

    <p style="height:2000px"></p>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/hjs/Navigation.vue'
import Carousel from '@/components/hjs/Carousel.vue'
import Footer from '@/components/hjs/Footer.vue'

export default {
  name:'home',
  data(){
    return {

    }
  },
  components:{
    Nav,
    Carousel,
    Footer,
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
</style>
