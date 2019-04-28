<template>
  <div class="promise-world">
    <div class="top">
      <!-- title -->
      <div class="title">
        <img src="@/assets/zjl/images/title1.jpg" alt>
      </div>
      <!-- 轮播 -->
      <div class="carousel">
        <el-carousel>
          <el-carousel-item>
            <img src="@/assets/zjl/images/carousel01.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/zjl/images/carousel02.jpg">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- title -->
      <div class="title2">
        <img src="@/assets/zjl/images/title2.jpg" alt>
      </div>
    </div>
    <!-- content -->
    <main class="content">
      <!-- row1 -->
      <el-row>
        <!-- col 1 -->
        <el-col :span="8">
          <div class="grid-content bg-purple item">
            <router-link to>
              <div class="item-img">
                <img src="@/assets/zjl/images/img01.jpg" alt>
              </div>
              <h4>品牌故事</h4>
              <p>以爱之名创立的玫瑰，愿你永远相信真爱。</p>
            </router-link>
          </div>
        </el-col>
        <!-- col 2 -->
        <el-col :span="8">
          <div class="grid-content bg-purple-light item">
            <router-link to>
              <div class="item-img" style="margin-left: 5px;">
                <img src="@/assets/zjl/images/img02.jpg" alt>
              </div>
              <h4>产品故事</h4>
              <p>不是每一朵玫瑰，都能成为roseonly。</p>
            </router-link>
          </div>
        </el-col>
        <!-- col 3 -->
        <el-col :span="8">
          <div class="grid-content bg-purple item">
            <router-link to>
              <div class="item-img" style="margin-left: 10px;">
                <img src="@/assets/zjl/images/img03.jpg" alt>
              </div>
              <h4>明星时刻</h4>
              <p>他们只在这里透露过，一生爱的人是谁。</p>
            </router-link>
          </div>
        </el-col>
      </el-row>
      <!-- row 2 -->
      <el-row>
        <!-- col 1 -->
        <el-col :span="8">
          <div class="grid-content bg-purple item">
            <router-link to>
              <div class="item-img">
                <img src="@/assets/zjl/images/img04.jpg" alt>
              </div>
              <h4>真爱见证</h4>
              <p>关于爱情的终极向往，就在我们身边。</p>
            </router-link>
          </div>
        </el-col>
        <!-- col 2 -->
        <el-col :span="8">
          <div class="grid-content bg-purple-light item">
            <router-link to>
              <div class="item-img" style="margin-left: 5px;">
                <img src="@/assets/zjl/images/img05.jpg" alt>
              </div>
              <h4>活动资讯</h4>
              <p>有爱的地方，就有roseonly。</p>
            </router-link>
          </div>
        </el-col>
        <!-- col 3 -->
        <el-col :span="8">
          <div class="grid-content bg-purple item">
            <router-link to>
              <div class="item-img" style="margin-left: 10px;">
                <img src="@/assets/zjl/images/img06.jpg" alt>
              </div>
              <h4>品牌故事</h4>
              <p>以爱之名创立的玫瑰，愿你永远相信真爱。</p>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.promise-world {
  width: 900px;
  margin: 0 auto;
}
.content .item {
  text-align: center;
}
.content .item a {
  color: #000;
}
.content .item p {
  font-size: 14px;
  margin-top: 20px;
}
.content .item h4 {
  margin-top: 20px;
}
.el-row {
  margin-bottom: 50px;
}
.item-img {
  width: 290px;
  height: 290px;
  overflow: hidden;
}
.item-img img {
  transition: all 0.3s;
}
.item-img:hover img {
  transform: scale(1.05, 1.05);
}

</style>

