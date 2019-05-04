<template>
  <div id="app">
    <Nav/>

    <div>
      <router-view name="login"></router-view>
    </div>

    <div :class="[{mtop: topdis},'container']" v-if="!isLogin">
      <router-view/>
    </div>

    <Footer style="margin-top:0px"/>
  </div>
</template>

<script>
import Nav from "@/components/hjs/Navigation.vue";
import Footer from "@/components/hjs/Footer.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      topdis: false
    };
  },
  components: {
    Nav,
    Footer
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 滚轮滑动距离
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop < 100 ? (this.topdis = false) : (this.topdis = true);
    }
  },
  computed: {
    ...mapState("hsj", ["isLogin"])
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.container {
  width: 1170px;
  margin: 0 auto;
  min-height: 400px;
}
.mtop {
  margin-top: 150px;
}
</style>

