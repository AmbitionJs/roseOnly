<template>
  <div id="app">
    <p>这是测试{{goodsId}}</p>

    <!-- 最上边部分的商品相关 -->
    <div class="Dtop">
      <!-- 左边展示图片区域 -->
      <div class="DtLeft">
        <!-- 大图 -->
        <div class="bigPic">
          <img src="https://www.roseonly.com.cn/upload/products/15131601940821798.png" alt>
        </div>

        <!-- 小图列表(切换大图) -->
        <div class="spicList">
          &lt;
          <span>
            <img src="https://www.roseonly.com.cn/upload/products/15131601940821798_1.png" alt>
          </span>
          <span>
            <img src="https://www.roseonly.com.cn/upload/products/15131601942202658_1.png" alt>
          </span>
          <span>
            <img src="https://www.roseonly.com.cn/upload/products/15131601943645268_1.png" alt>
          </span>
          <span>
            <img src="https://www.roseonly.com.cn/upload/products/15131601945254591_1.png" alt>
          </span>
          &gt;
        </div>
      </div>

      <!-- 右边选择商品分 -->
      <div class="DtRight">
        <div class="DRlimit">
          <p style="font-size:20px">高端定制 - 甜心熊灰色站立版嫣红 120cm</p>
          <p class="fontSmall" style="color:#666;">1011150019</p>
          <div class="price">
            <span class="fontSmall">价格 : </span>
            <span style="font-size:20px;font-weight:500">￥2999</span>
          </div>

          <div class="color">
            <span class="fontSmall">颜色 : </span>
            <span class="DTRimg">
              <img src="https://www.roseonly.com.cn/upload/products/15457366485329166_2.png" alt="">
            </span>
            <span class="DTRimg">
              <img src="https://www.roseonly.com.cn/upload/products/15457366619999140_2.png" alt="">
            </span>
          </div>

          <div class="num">
            <span class="fontSmall">数量 : </span>
            <el-input-number
              size="small"
              v-model="buyNum"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </div>

          <div class="btns">
            <el-button type="primary" plain>立即购买</el-button>
            <el-button plain>加入购物车</el-button>
          </div>

          <p class="fontSmall">服务承诺：官方正品 &nbsp; 免邮配送 &nbsp; 同城速递</p>
        </div>
      </div>
    </div>

    <!-- 中间部分的商品参数信息 -->
    <div class="Dmid">
      <h3>
        产品参数
      </h3>
      <ul>
        <li>
          <span style="font-weight:600">适用场景 : </span>什么场景都适合嘻嘻
        </li>
        <li>适用对象</li>
        <li>适用节日</li>
      </ul>
      <ul>
        <li>鲜花朵数</li>
        <li>颜色分类</li>
        <li>产品规格</li>
      </ul>
    </div>

    <!-- 底部的图片信息 -->
    <div class="Dbot"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: -1,
      buyNum:1,
      goodsMsg:[]
    };
  },
  created() {
    // 获取url中的参数
    this.goodsId = this.$route.params.id;
  },
  watch:{
    $route(val,oldVal){
      this.goodsId = val.params.id;
    },
    goodsId(val,oldVal){

      this.axios.get('/goods/search/'+val)
     .then(res => {
       console.log(res.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     })

    }
  },
  methods:{
    handleChange(val){
      //console.log(val)
    }
  }
};
</script>

<style scoped>
/* 顶部商品部分 */
.Dtop {
  display: flex;
  flex-wrap: wrap;
}
/* 顶部商品左边部分 */
.DtLeft {
  width: 50%;
  height: 500px;
  background: antiquewhite;
}
/* 大图 */
.bigPic {
  text-align: center;
  margin: 20px 0;
}
.bigPic img {
  width: 350px;
  height: 350px;
}
/* 列表图 */
.spicList {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  line-height: 53px;
}
.spicList span {
  width: 53px;
  height: 53px;
  border: 1px solid #222;
  cursor: pointer;
}
.spicList span img {
  width: 100%;
  height: 100%;
}

/* 顶部商品右边部分 */
.DtRight {
  width: 50%;
  height: 500px;
  background: thistle;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.DRlimit{
  height: 340px;
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.fontSmall {
  font-size: 13px;
}
.price {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
}
.color{
  height: 42px;
  line-height: 42px;
  display: flex;
}
.DTRimg{
  width: 40px;
  height: 40px;
  border: 1px solid #222;
  margin: 0 2px;
  cursor: pointer;
}

/* 中间部分参数 */
.Dmid{
  height: 123px;
  margin: 20px 0;
  padding: 20px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: space-around;
}
.Dmid h3{
  line-height: 123px;
  width: 20%;
  text-align: center;
}
.Dmid ul{
  width: 40%;
}
.Dmid ul li{
  padding: 10px 0;
  list-style:disc
}
</style>
