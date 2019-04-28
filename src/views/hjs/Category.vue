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
        <!-- <span :class="{Cactive:filterMethods==1}" @click="sellsType(goodsTypeId)">销量</span> -->
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
        :class="{Chover:active==index}"
        @mouseover="active=index"
        @mouseout="active=-1"
        v-for="(item,index) in goodsList" :key="item.goodsNo"
      >
        <div class="goodshowImg">
          <!-- <img :src="'http://172.16.7.76:8080/'+item.pictures[0].picFileUrl" alt> -->
        </div>
        <h4>{{item.goodsName}}</h4>
        <p style="padding:5px 0">{{item.goodsDetail}}</p>
        <h4>{{item.goodsPrice}}</h4>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" 
    :total="goodsList.length*100"
    @current-change='pageChange'
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterMethods: 0,
      active: -1,
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

      this.axios.get('/goods/search/type/'+goodsTypeId)
     .then(res => {
       // console.log('商品分类展示列表', res.data.data[0].pictures[0].picFileUrl)
       this.goodsList = res.data.data
        console.log('综合的ajax请求发起',goodsTypeId)
     })
     .catch(err => {
       console.log('出错信息:',err)
     })
    },

    // 按销量
    /*sellsType(goodsTypeId){
      this.filterMethods=1
       this.axios.get('/goods/search/sells/{order}',{
       goodsTypeId:goodsTypeId,
     })
     .then(res => {
       console.log(JSON.parse(res.data))
       this.goodsList = JSON.parse(res.data)
     })
     .catch(err => {
       console.log('出错信息:',err)
     }) 
     console.log('销量',goodsTypeId)
    },*/

    // 按最新
    newsType(goodsTypeId){
      this.filterMethods=2
      this.axios.get('/goods/search/grouding',{
        order:'asc',
       goodsTypeId:3,
     })
     .then(res => {
       console.log('最新的ajax请求发起',res.data)
       //this.goodsList = res.data
     })
     .catch(err => {
       console.log('出错信息:',err)
     })
    },

    // 按价格
    priceType(goodsTypeId,lowest=this.lowPrice,heighest=this.heighPrice){
      this.filterMethods=3
      this.axios.get('/goods/search/price',{
       goodsTypeId,
       lowest:0,
       heighest:1000,
     })
     .then(res => {
       console.log('价格请求',res.data)
       //this.goodsList = res.data
     })
     .catch(err => {
       console.log('出错信息:',err)
     })
     lowest && console.log('当输入了最小值才显示当前最小值:',lowest)
     heighest && console.log('当输入了最大值才显示当前最大值:',heighest)
    },

    // 分页中的当前页改变
    pageChange(val){
      console.log('分页中的当前页改变',this.goodsTypeId)

      /* this.axios.get('/goods/search/type/'+this.goodsTypeId,{
        pageNo:val
      })
     .then(res => {
       // console.log('商品分类展示列表', res.data.data[0].pictures[0].picFileUrl)
       this.goodsList = res.data.data
        console.log('综合的ajax请求发起',goodsTypeId)
     })
     .catch(err => {
       console.log('出错信息:',err)
     }) */
    }
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
