<template>
  <div id="app">
    <div class="top-tittle" v-show="topdis">
      <router-link to='/'>
        <h1 class="tittle">roseonly</h1>
      </router-link>
    </div>
    <el-container :class="{fixed:!topdis}">
      <el-main>
        <!-- 导航的左边 -->
        <div class="nav-left" v-if="!topdis">
          <router-link to="/">roseonly</router-link>
        </div>

        <!-- 导航的中间部分,链接 -->
        <div class="nav-middle">
          <div v-for='(item,index) in getFirstNavList' :key='item.goodsTypeId' @mouseover="listIndex = index" @mouseout="listIndex = -1" class="nav-header">
            <span>{{item.goodsTypeName}}</span>
            <!-- 下方的下拉列表 -->
            <transition name="fade">
              <div class="nav-list" v-show="listIndex==index">

                <!-- 列表中左边的全部分类 -->
                <div class="nav-list-msg">
                  <ul v-for="item1 in getNextNavList(item.goodsTypeId)" :key="item1.goodsTypeId">
                    <!-- 二级分类 -->
                    <li>{{item1.goodsTypeName+item1.goodsTypeId}}</li>
                    <!-- 三级分类 -->
                    <li v-for="item2 in getNextNavList(item1.goodsTypeId)" :key="item2.goodsTypeId">
                      <router-link :to="'/Category/'+item2.goodsTypeId">{{item2.goodsTypeName+item2.goodsTypeId}}</router-link>
                    </li>
                  </ul>
                </div>

                <!-- 列表中右边的图片部分 -->
                <div class="nav-list-img">
                  <img src="https://www.roseonly.com.cn/upload/menupic/15379438294817267.jpg" alt>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 导航的右边部分,用户和购物车 -->
        <div class="nav-right" style="cursor: pointer">
          <!-- 用户 -->
          <div class="nav-right-user">
            <router-link to='/person' v-if="islogin" title="个人中心">
              <span class="iconfont icon-yonghu user-fa"></span>
            </router-link>
            <router-link to='/login' v-if="!islogin" title="去登录">
              <span class="iconfont icon-yonghu user-fa"></span>
            </router-link>
          </div>


          <!-- 购物车 -->
          <div class="nav-right-car" title="购物车" v-if="islogin">
            <router-link to='/car'>
              <span class="iconfont icon-bags"></span>
            </router-link>
          </div>

          <!-- 退出 -->
          <div class="nav-right-pos" style="cursor: pointer" v-if="islogin">
            <router-link to='/'>
              <span class="iconfont icon-tuichu" @click="logOut" title="退出"></span>
            </router-link>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 导航中的用户，购物车，地图三个图标
import "@/assets/hjs/iconfont.css";
import {mapMutations,mapGetters } from 'vuex'

export default {
  data() {
    return {
      topdis: true, // 距离顶部的距离
      islogin: false, // 判断是否登录
      listIndex: -1,
    };
  },
  computed:{
    ...mapGetters('hjs',['getFirstNavList','getNextNavList'])
  },
  methods: {
    // 滚轮滑动距离
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop < 100 ? (this.topdis = true) : (this.topdis = false);
    },
    
    // 退出
    logOut(){
      localStorage.clear()
      this.islogin = false;
    }

    // 修改store里面的state导航列表数据
    ,...mapMutations('hjs',['setNavList'])
  },
  created() {
    console.log('导航条的created被执行了')

    // 监听滑动条距离
    window.addEventListener("scroll", this.handleScroll);

    // 如果已经登录,则将登录状态设置为true
    if (localStorage.getItem("token")) {
      this.islogin = true;
    }
    
      // 发送ajax请求,并将数据存入state
      this.axios({
        method: 'get',
        url: '/goods/storage',
        baseURL:'http://172.16.7.81:8080'
      })
      .then(res => {
        console.log('这是导航请求',res.data.data.goodsTypeList)
        // ... ajax请求成功后通过mutation修改state里面的数据
        this.setNavList(res.data.data.goodsTypeList)
      })
      .catch(err => {
        console.log('出错信息:',err)
      })
  },
};
</script>

<style scoped>
#app {
  position: relative;
  color: #fff;
  z-index: 999;
}
a {
  text-decoration: none;
  color: white;
}
/* 标题 */
.tittle {
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 36px;
  letter-spacing: 1.8px;
  font-weight: 100;
  background: #393939;
}
/* 导航条 */
/* 实现定位 */
.el-container {
  width: 100%;
  position: relative;
}
.fixed {
  position: fixed;
  top: 0;
}
.el-main {
  padding: 0;
  height: 50px;
  line-height: 50px;
  background: #414141;
  display: flex;
  justify-content: space-around;
}
/* 左边的roseonly链接 */
.nav-left {
  width: 6%;
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 1.3px;
  text-align: center;
}
/* 中间的各种商品链接 */
.nav-middle {
  width: 82%;
  display: flex;
  justify-content: space-around;
}
/* 右边的用户以及购物车链接 */
.nav-right {
  width: 10%;
  display: flex;
  justify-content: space-around;
}
/* 鼠标移入后的下拉菜单 */
.nav-list {
  width: 100%;
  min-height: 300px;
  border-bottom: 3px solid black;
  position: absolute;
  top: 50px;
  left: 0;
  background: rgba(255, 255, 255, 0.986);
  color: black;
  display: flex;
  justify-content: space-around;
}
.nav-list a {
  color: black;
}
.nav-list-msg {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.nav-list-msg ul li {
  padding: 0 50px;
  border-left: 1px solid black;
  height: 36px;
  font-size: 14px;
}
.nav-list-msg ul:first-child li {
  border-left: none;
}
.nav-list-msg ul li:first-child {
  font-weight: 700;
}
.nav-list-img {
  display: flex;
  align-items: center;
}
/* 下拉列表动画部分 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 鼠标移入一级标题后的active属性 */
.nav-header {
  padding: 0 8px;
}
.nav-header:hover {
  background: white;
  color: black;
}
</style>

