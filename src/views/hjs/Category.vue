<template>
  <div id="app">
    <!-- 顶上的图片 -->
    <div>
      <img src alt>
      {{goodsTypeId}}
    </div>

    <!-- 中间的筛选列表 -->
    <div class="Cfilters">
      <div class="CLimit">
        <span :class="{Cactive:filterMethods==0}" @click="defaultType(goodsTypeId)">综合</span>
        <span :class="{Cactive:filterMethods==1}" @click="sellsType(goodsTypeId)">销量</span>
        <span :class="{Cactive:filterMethods==2}" @click="newsType(goodsTypeId)">最新</span>
        <span :class="{Cactive:filterMethods==3}" @click="priceType(goodsTypeId)">价格</span>
        <input type="text" class="min" placeholder="￥" v-model="lowPrice" @input="priceType(goodsTypeId)">
        —
        <input type="text" class="max" placeholder="￥" v-model="heighPrice" @input="priceType(goodsTypeId)">
      </div>
    </div>

    <!-- 下边的所有商品信息 -->
    <div class="CGoodsList">
      <div
        style="width:25%;height:400px;text-align:center;cursor:pointer;"
        :class="{Chover:active}"
        @mouseover="active=true"
        @mouseout="active=false"
      >
        <div class="goodshowImg">
          <img src="https://www.roseonly.com.cn/upload/products/15457366485329166.png" alt>
        </div>
        <h4>鲜花玫瑰-玫瑰公仔系列</h4>
        <p style="padding:5px 0">甜心兔手捧鲜花</p>
        <h4>￥1999</h4>
      </div>

      <div
        style="width:25%;height:400px;text-align: center;"
        :class="{Chover:active}"
        @mouseover="active=true"
        @mouseout="active=false"
      >
        <div class="goodshowImg">
          <img src="https://www.roseonly.com.cn/upload/products/15457366485329166.png" alt>
        </div>
        <h4>鲜花玫瑰-玫瑰公仔系列</h4>
        <p style="padding:5px 0">甜心兔手捧鲜花</p>
        <h4>￥1999</h4>
      </div>

      <div
        style="width:25%;height:400px;text-align:center;"
        :class="{Chover:active}"
        @mouseover="active=true"
        @mouseout="active=false"
      >
        <div class="goodshowImg">
          <img src="https://www.roseonly.com.cn/upload/products/15457366485329166.png" alt>
        </div>
        <h4>鲜花玫瑰-玫瑰公仔系列</h4>
        <p style="padding:5px 0">甜心兔手捧鲜花</p>
        <h4>￥1999</h4>
      </div>

      <div
        style="width:25%;height:400px;text-align: center;"
        :class="{Chover:active}"
        @mouseover="active=true"
        @mouseout="active=false"
      >
        <div class="goodshowImg">
          <img src="https://www.roseonly.com.cn/upload/products/15457366485329166.png" alt>
        </div>
        <h4>鲜花玫瑰-玫瑰公仔系列</h4>
        <p style="padding:5px 0">甜心兔手捧鲜花</p>
        <h4>￥1999</h4>
      </div>

      <div
        style="width:25%;height:400px;text-align: center;"
        :class="{Chover:active}"
        @mouseover="active=true"
        @mouseout="active=false"
      >
        <div class="goodshowImg">
          <img src="https://www.roseonly.com.cn/upload/products/15457366485329166.png" alt>
        </div>
        <h4>鲜花玫瑰-玫瑰公仔系列</h4>
        <p style="padding:5px 0">甜心兔手捧鲜花</p>
        <h4>￥1999</h4>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="400"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterMethods: 0,
      active: false,
      goodsTypeId: -1,
      goodsList: [],
      lowPrice:null,
      heighPrice:null,
    };
  },
  created() {
    this.goodsTypeId = this.$route.params.id;
    // 这里改变了goodsTypeId将触发监听
  },
  watch: {
    $route(newVal) {
      this.goodsTypeId = newVal.params.id;
    },
    goodsTypeId(newVal){
      this.defaultType(newVal)
    }
  },
  methods:{
    // 综合(默认)
    defaultType(goodsTypeId){
      this.filterMethods=0

      this.axios.get('/goods/search/type/'+goodsTypeId,{
        pageNo:2,
        pageSize:3
      })
     .then(res => {
       console.log('商品分类展示列表',res.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     })
     
     console.log('综合',goodsTypeId)
    },

    // 按销量
    sellsType(goodsTypeId){
      this.filterMethods=1
      /* this.axios.get('/goods/search/sells/{order}',{
       goodsTypeId:goodsTypeId,
     })
     .then(res => {
       console.log(JSON.parse(res.data))
       this.goodsList = JSON.parse(res.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     }) */
     console.log('销量',goodsTypeId)
    },

    // 按最新
    newsType(goodsTypeId){
      this.filterMethods=2
      /* this.axios.get('/goods/search/grouding/{order}',{
       goodsTypeId:goodsTypeId,
     })
     .then(res => {
       console.log(JSON.parse(res.data))
       this.goodsList = JSON.parse(res.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     }) */
     console.log('最新',goodsTypeId)
    },

    // 按价格
    priceType(goodsTypeId,lowest=this.lowPrice,heighest=this.heighPrice){
      this.filterMethods=3
      /* this.axios.get('/goods/search/price',{
       goodsTypeId,
       lowest,
       heighest
     })
     .then(res => {
       console.log(JSON.parse(res.data))
       this.goodsList = JSON.parse(res.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     }) */
     console.log('价格',goodsTypeId)
     lowest && console.log('当输入了最小值才显示当前最小值:',lowest)
     heighest && console.log('当输入了最大值才显示当前最大值:',heighest)
    },
  }
};
</script>

<style scoped>
/* 中间筛选列表 */
.Cfilters {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 8px 0;
  font-size: 16px;
}
.CLimit {
  width: 70%;
  min-width: 600px;
  display: flex;
  justify-content: space-around;
}
.CLimit span {
  cursor: pointer;
}
.Cactive {
  border-bottom: 5px solid black;
  font-weight: 500;
}

/* 商品展示 */
.CGoodsList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.goodshowImg {
  padding: 20px 0;
}
.goodshowImg img {
  width: 260px;
  height: 260px;
}
.Chover {
  background-color: #ddd;
}

/* 分页 */
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
</style>
