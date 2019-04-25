<template>
  <div id="app">
    
    <Nav />

    <div :class="[{mtop: topdis},'container']">
      <router-view/>
    </div>
    

    <Footer />
    
  </div>
</template>

<<<<<<< HEAD
<script>
import Nav from '@/components/hjs/Navigation.vue'
import Footer from '@/components/hjs/Footer.vue'

export default {
  data(){
    return {
      topdis:false
    }
  },
  components:{
    Nav,
    Footer,
  },
  created(){
    window.addEventListener("scroll", this.handleScroll);
  },
  methods:{
    // 滚轮滑动距离
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop < 100 ? (this.topdis = false) : (this.topdis = true);      
    },
  }
}
</script>


<style>
  *{
    margin: 0;
    padding: 0;
  }
  ul,li{
    list-style: none;
  }
  .container{
    width: 1170px;
    margin: 0 auto;
  }
  .mtop{
    margin-top: 150px;
  }
=======
<style>
  
>>>>>>> 2915fcf85b25e2a862a554fbeecfd18cd876ce1c
</style>

