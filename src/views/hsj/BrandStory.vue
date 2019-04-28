<template>
  <div class="brandstory">
    <img src="https://www.roseonly.com.cn/upload/picture/14573223079612674.jpg" alt="品牌故事">
    <el-row>
      <el-col :span="8" v-for="story in stories" :key="story.id">
        <Story :story="story"/>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-col-8 {
    text-align: center;
}
Story:hover {
    cursor: pointer;
}
</style>


<script>
// 引入故事插件
import Story from "../../components/hsj/Story.vue";

export default {
  data() {
    return {
      // 品牌故事所有数据
      stories: [
        {
          id: 1,
          imgSrc:
            "https://www.roseonly.com.cn/upload/picture/15559990217444070.jpg",
          title: "2018城市爱情报告",
          secondTitle: "roseonly诺誓爱情研究院权威发布",
          alt: "roseonly诺誓 2018城市爱情报告",
          to: '',
        },
        {
          id: 2,
          imgSrc:
            "https://www.roseonly.com.cn/upload/syspicture/15150512521566675.jpg",
          title: "2017城市爱情报告",
          secondTitle: "roseonly诺誓爱情研究院权威发布",
          alt: "roseonly诺誓 2017城市爱情报告"
        },
        {
          id: 3,
          imgSrc:
            "https://www.roseonly.com.cn/upload/syspicture/14865336352995476.jpg",
          title: "2016城市爱情报告",
          secondTitle: "roseonly诺誓爱情研究院权威发布",
          alt: "roseonly诺誓 2016城市爱情报告"
        },
        {
          id: 4,
          imgSrc:
            "https://www.roseonly.com.cn/upload/picture/15559990296853852.jpg",
          title: "roseonly六周年",
          secondTitle:
            "新年初启，相伴的心与爱你的气息",
          alt: "roseonly诺誓 roseonly六周年"
        },
        {
          id: 5,
          imgSrc:
            "https://www.roseonly.com.cn/upload/picture/15559990407381503.jpg",
          title: "roseonly今天五岁啦！",
          secondTitle: "roseonly五周年，在见证爱情中预见永恒",
          alt: "roseonly诺誓 roseonly今天五岁啦！"
        },
        {
          id: 6,
          imgSrc:
            "https://www.roseonly.com.cn/upload/syspicture/14835313101905720.jpg",
          title: "roseonly四周年",
          secondTitle: "roseonly诞生，只为一个虔诚的信念：信者得爱，爱是唯一。",
          alt: "roseonly诺誓 roseonly四周年"
        },
        {
          id: 7,
          imgSrc:
            "https://www.roseonly.com.cn/upload/syspicture/14573342557718093.jpg",
          title: "roseonly三周年，爱的初心始终不变",
          secondTitle: "2013.1.4寓意“爱你一生一世”的世纪告白日，roseonl...",
          alt: "roseonly诺誓 roseonly三周年，爱的初心始终不变"
        },
        {
          id: 8,
          imgSrc:
            "https://www.roseonly.com.cn/upload/picture/15559990478885960.jpg",
          title: "2019品牌大事记",
          secondTitle: "roseonly爱之旅程，感恩有你一路相伴",
          alt: "roseonly诺誓 2019品牌大事记"
        },
        {
          id: 9,
          imgSrc:
            "https://www.roseonly.com.cn/upload/picture/15559377621391464.jpg",
          title: "2018城市爱情报告",
          secondTitle: "有真爱的地方，总有roseonly浪漫见证",
          alt: "roseonly诺誓 品牌介绍"
        }
      ],
    };
  },
  components: {
    Story,
  }
};
</script>

