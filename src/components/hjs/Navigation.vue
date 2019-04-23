<template>
  <div id="app">
    <div class="top-tittle" v-show="topdis">
      <router-link to>
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
          <div @mouseover="listIndex = 1" @mouseout="listIndex = 0" class="nav-header">
            <span>新品上市</span>
            <!-- 下方的下拉列表 -->
            <transition name="fade">
              <div class="nav-list" v-show="listIndex==1">
                <!-- 列表中左边的全部分类 -->
                <div class="nav-list-msg">
                  <ul>
                    <li>场合</li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                  </ul>

                  <ul>
                    <li>气氛</li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                  </ul>

                  <ul>
                    <li>年龄</li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
                    </li>
                    <li>
                      <router-link to>经典永续</router-link>
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

          <div @mouseover="listIndex = 2" @mouseout="listIndex = 0">
            <span>爱礼推荐</span>
            <!-- 下方的下拉列表 -->
            <transition name="fade">
              <div class="nav-list" v-show="listIndex==2">2内容</div>
            </transition>
          </div>
          <div>鲜花玫瑰</div>
          <div>永生玫瑰</div>
          <div>玫瑰珠宝</div>
          <div>玫瑰香氛</div>
        </div>

        <!-- 导航的右边部分,用户和购物车 -->
        <div class="nav-right" style="cursor: pointer">
          <!-- 用户 -->
          <div class="nav-right-user">
            <router-link to v-if="islogin" title="个人中心">
              <span class="iconfont icon-yonghu user-fa"></span>
            </router-link>
            <router-link to v-if="!islogin" title="去登录">
              <span class="iconfont icon-yonghu user-fa"></span>
            </router-link>
          </div>

          <!-- 购物车 -->
          <div class="nav-right-car" title="购物车">
            <router-link to>
              <span class="iconfont icon-bags"></span>
            </router-link>
          </div>

          <!-- 定位 -->
          <div class="nav-right-pos" style="cursor: pointer">
            <span class="iconfont icon-dingwei"></span>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 导航中的用户，购物车，地图三个图标
import "@/assets/hjs/iconfont.css";

export default {
  data() {
    return {
      topdis: true, // 距离顶部的距离
      islogin: false, // 判断是否登录
      listIndex: 0
    };
  },
  methods: {
    // 滚轮滑动距离
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop < 100 ? (this.topdis = true) : (this.topdis = false);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    // 如果已经登录,则将登录状态设置为true
    if (sessionStorage.getItem("token")) {
      this.islogin = true;
    }
    
  }
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
  background: #414141;
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
  background: #fff;
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
  transition: opacity 0.5s;
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

