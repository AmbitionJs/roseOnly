<template>
  <div id="app">
    <!-- <p>这是测试{{goodsId}}</p> -->

    <!-- 最上边部分的商品相关 -->
    <div class="Dtop">
      <!-- 左边展示图片区域 -->
      <div class="DtLeft">
        <!-- 大图 -->
        <div class="bigPic">
          <img :src="'http://172.16.7.76:8080/'+bigPicUrl" alt>
        </div>

        <!-- 小图列表(切换大图) -->
        <div class="spicList">
          &lt;
          <span v-for="(item,index) in topPic" :key="index" @click="changePic(index)">
            <img :src="'http://172.16.7.76:8080/'+item" alt>
          </span>
          &gt;
        </div>
      </div>

      <!-- 右边选择商品分 -->
      <div class="DtRight">
        <div class="DRlimit">
          <p style="font-size:20px">{{goodsMsg.goodsName}}</p>
          <p class="fontSmall" style="color:#666;">{{goodsMsg.goodsNo}}</p>
          <div class="price">
            <span class="fontSmall">价格 : </span>
            <span style="font-size:20px;font-weight:500">￥{{goodsMsg.goodsPrice}}</span>
          </div>

          <div class="color">
            <span class="fontSmall">颜色 : </span>
            <span class="DTRimg">
             <img :src="'http://172.16.7.76:8080/'+topPic[0]" alt>
            </span>
          </div>

          <div class="num">
            <span class="fontSmall">数量 : </span>
            <el-input-number
              size="small"
              v-model="buyNum"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </div>

          <div class="btns">
            <el-button type="primary" plain @click="pay">立即购买</el-button>
            <el-button plain @click="car">加入购物车</el-button>
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
          <span style="font-weight:600">适用场景 : </span>{{goodsMsg.goodsDetail || '有ta的所有地方'}}
        </li>
        <li>
          <span style="font-weight:600">适用对象 : </span>{{goodsMsg.object || '男女朋友'}}
        </li>
        <li>
          <span style="font-weight:600">适用节日 : </span>{{goodsMsg.holiday || '所有快乐的节日'}}
        </li>
      </ul>
      <ul>
        <li>
          <span style="font-weight:600">鲜花朵数 : </span>{{goodsMsg.goodsSpecs || '99朵'}}
        </li>
        <li>
          <span style="font-weight:600">颜色分类 : </span>{{goodsMsg.goodsColor || '玫瑰红'}}
        </li>
        <li>
          <span style="font-weight:600">产品规格 : </span>{{goodsMsg.goodsSpecs || '20支80cm'}}
        </li>
      </ul>
    </div>

    <!-- 底部的图片信息 -->
    <div class="Dbot">
      <div class="DBimg" v-for="(item,index) in bottomPic" :key="index">
        <img :src="'http://172.16.7.76:8080/'+item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      goodsId: -1,
      buyNum:1,
      goodsMsg:{},
      topPic:[], //上面的图
      bottomPic:[], //下面的描述图片
      bigPicUrl:null // 显示的主图
    };
  },
  created() {
    console.log('商品详情页中的created被执行')
    // 获取url中的参数
    this.goodsId = this.$route.params.id;

  },
  watch:{
    $route(val){
      this.goodsId = val.params.id;
    },
    goodsId(val){
      console.log('商品详情的ajax被请求',val)
      this.axios.get('/goods/search/'+val)
     .then(res => {
       for(let i = 0;i<res.data.data.pictures.length;i++){
         if(res.data.data.pictures[i].picCode == 2){
           console.log('上面的图',res.data.data.pictures[i].picFileUrl)
          //  this.$set(this.topPic, index, res.data.data.pictures[i].picFileUrl)
           this.topPic.push(res.data.data.pictures[i].picFileUrl)
         }else if(res.data.data.pictures[i].picCode == 3){
           console.log('下面的描述图片',res.data.data.pictures[i].picFileUrl)
           this.bottomPic.push(res.data.data.pictures[i].picFileUrl)
         }
       }
       this.goodsMsg = res.data.data
     })
     .catch(err => {
       console.log('出错信息:',err)
     })
    },
    topPic(val){
      console.log('监听topPic',val[0])
      this.bigPicUrl = val[0]
    }
  },
  methods:{
    ...mapMutations('orders',['buyNowOrders']),

    // 立即购买
    pay(){
      console.log(this.goodsId,this.buyNum,localStorage.getItem('token'))
      this.axios.post('/orders/client/'+ this.goodsId +'/purchase',{
          goodsId:this.goodsId,
          goodsNum:this.buyNum,
          userToken:localStorage.getItem('token')
     })
     .then(res => {
       console.log('立即购买返回数据',res.data.code)
       if(res.data.code == 200){
        sessionStorage.setItem('submitOrders', JSON.stringify(res.data.data))
        this.$router.push("/submitOrder");
        this.buyNowOrders(res.data.data)
       }else{
         this.$message('请先登录');
         setTimeout(() => {
           this.$router.push("/login");
         }, 1000);
       }
     })
     .catch(err => {
       console.log('立即购买出错信息:',err)
     })

    },

    // 加入购物车
    car(){
      console.log(this.goodsId,this.buyNum,localStorage.getItem('token'))
      this.axios.post('/trolley/add',{
          goodsId:this.goodsId,
          goodsNum:this.buyNum,
          userToken:localStorage.getItem('token')
     })
     .then(res => {
       console.log('加入购物车返回数据:',res.data)
        if(res.data.code==200){
          this.$message({
          message: '加入购物车成功',
          type: 'success'
        });
        }else{
          this.$message('请先登录');
         setTimeout(() => {
           this.$router.push("/login");
         }, 1000);
        }
     })
     .catch(err => {
       console.log('加入购物车出错信息:',err)
     })
    },

    changePic(index){
      console.log('点击了小图',index)
      this.bigPicUrl = this.topPic[index]
    }
  }
};
</script>

<style scoped>
img{
  width: 100%;
  height: auto;
}
/* 顶部商品部分 */
.Dtop {
  display: flex;
  flex-wrap: wrap;
}
/* 顶部商品左边部分 */
.DtLeft {
  width: 50%;
  height: 500px;
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
  padding: 20px 0;
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

.DBimg img{
  width: 100%;
  height: auto;
}
</style>
