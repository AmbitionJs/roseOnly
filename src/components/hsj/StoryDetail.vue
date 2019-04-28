<template>
    <div class="detail">
        detail
    </div>
</template>

<script>
export default {
    data() {
        return {
            detailLists: [
                {
                    img: [
                        {
                            src: 'http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg',
                            title: '1555991500902005823.jpg',
                        },
                        {
                            src: 'http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg',
                            title: '1555991501019023451.jpg',
                        },
                        {
                            src: 'http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg',
                            title: '1555991501210059051.jpg',
                        },
                    ]
                },
            ],
            currentId: null,
        }
    },
    created() {
        this.currentId = this.$route.hash.substr(1, 1)
    }
}
</script>

