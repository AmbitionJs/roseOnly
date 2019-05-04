<template>
  <div id="app">
    <div class="footer-list">
      <ul>
        <li>新手指南</li>
        <li>
          <router-link to='/foot'>购物流程</router-link>
        </li>
        <li>
          <router-link to='/foot'>会员尊享</router-link>
        </li>
        <li>
          <router-link to='/foot'>常见问题</router-link>
        </li>
        <li>
          <router-link to='/foot'>指圈测量</router-link>
        </li>
      </ul>
      <ul>
        <li>物流配送</li>
        <li>
          <router-link to='/foot'>配送方式</router-link>
        </li>
        <li>
          <router-link to='/foot'>配送服务</router-link>
        </li>
      </ul>
      <ul>
        <li>售后服务</li>
        <li>
          <router-link to='/foot'>退款说明</router-link>
        </li>
        <li>
          <router-link to='/foot'>保养物语</router-link>
        </li>
      </ul>
      <ul>
        <li>关于我们</li>
        <li>
          <router-link to='/foot'>品牌介绍</router-link>
        </li>
        <li>
          <router-link to='/foot'>销售渠道</router-link>
        </li>
        <li>
          <router-link to='/foot'>联系我们</router-link>
        </li>
        <li>
          <router-link to='/foot'>加入我们</router-link>
        </li>
      </ul>
      <ul>
        <li>关注我们</li>
        <li>
          <router-link to='/foot'>
            微信
            <span class="iconfont icon-changyonglogo28"></span>
          </router-link>
        </li>
        <li>
          <router-link to='/foot'>
            微博
            <span class="iconfont icon-weibo"></span>
          </router-link>
        </li>
      </ul>
    </div>

    <p class="last-msg">
      <span>©2019 roseonly（中国）贸易有限公司 保留所有权利</span>
      <span>沪公网安备 31010602001727号</span>
      <span>上海工商</span> 
      <span>沪ICP备13010397号-2</span>
    </p>
  </div>
</template>

<script>
import "@/assets/hjs/iconfont.css";

export default {};
</script>

<style scoped>
#app{
  background: #414141;
  padding-top: 10px;
}
a {
  text-decoration: none;
  color: #aaa;
}
.footer-list {
  display: flex;
  justify-content: space-around;
}
li {
  color: #eee;
  padding: 6px 0;
  font-size: 14px;
}
ul li:first-child {
  font-size: 16px;
  margin-bottom: 10px;
}
.last-msg{
  padding: 20px 0;
  color: #aaa;
  font-size: 14px;
}
.last-msg span{
  padding-left: 40px;
}
.last-msg span:first-child{
  padding-left: 100px;
}
</style>
