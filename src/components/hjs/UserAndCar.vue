<template>
  <div id="app">

    <div class="user-child">
      <p class="noLogin" v-if="isLogin">
        <router-link to=''>登录</router-link>
        <router-link to=''>注册</router-link>
      </p>
      <p class="logged" v-if="isLogin">
        <router-link to=''>个人中心</router-link>
        <router-link to=''>退出</router-link>
      </p>

      <hr>
      <p>
        用心定制您的产品
      </p>
    </div>

    <router-link to=''>
    </router-link>

  </div>
</template>

<script>


export default {
  data(){
    return {
      isLogin:sessionStorage.getItem('token'),
    }
  }
}
</script>

<style scoped>
#app{
  /* height: 50px;
  width: 100px; */
  display: flex;
  justify-content: space-around;
  position: relative;
}
.user-fa:hover .user-hide{
  display: block;
}
.user-hide{
  display: none;
}

.user-child{
  position: absolute;
  top:0;
  left: 0;
  width: 300px;
  height: 300px;
  background: #fff;
  color: black;
}
</style>
