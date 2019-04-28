<template>
    <div class="brandstory">
        <Story v-for="story in stories" :key="story.id" :story="story" />
    </div>
</template>

<script>
// 引入故事插件
import Story from '../../components/hsj/Story.vue'

export default {
    data() {
        return {
            stories: [
                {
                    id: 1,
                    imgSrc: 'https://www.roseonly.com.cn/upload/picture/15559990217444070.jpg',
                    title: '2018城市爱情报告',
                    secondTitle: 'roseonly诺誓爱情研究院权威发布',
                },
                {
                    id: 2,
                    imgSrc: '@assets/hsj/brandstory/2.jpg',
                    title: '2017城市爱情报告',
                    secondTitle: 'roseonly诺誓爱情研究院权威发布',
                }
            ]
        }
    },
    components: {
        Story,
    },
}
</script>

