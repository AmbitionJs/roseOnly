<template>
  <div class="detail">
    <div class="image">
      <img
        v-for="list in detailList[currentId].imgs"
        :key="list.id"
        :src="list.src"
        :alt="list.alt"
      >
    </div>
  </div>
</template>

<style>
.image {
  text-align: center;
}
</style>


<script>
export default {
  data() {
    return {
      detailList: [
        {
          name: "list1",
          id: 1,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 2,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 3,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 4,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 5,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 6,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 7,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 8,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        },
        {
          name: "list1",
          id: 9,
          imgs: [
            {
              id: 1,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991500902005823.jpg",
              alt: "1555991500902005823.jpg"
            },
            {
              id: 2,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991578570022381.jpg",
              alt: "1555991578570022381.jpg"
            },
            {
              id: 3,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 4,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501019023451.jpg",
              alt: "1555991501019023451.jpg"
            },
            {
              id: 5,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501210059051.jpg",
              alt: "1555991501210059051.jpg"
            },
            {
              id: 6,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501380029333.jpg",
              alt: "1555991501380029333.jpg"
            },
            {
              id: 7,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501377021810.jpg",
              alt: "1555991501377021810.jpg"
            },
            {
              id: 8,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501606018911.jpg",
              alt: "1555991501606018911.jpg"
            },
            {
              id: 9,
              src:
                "http://www.roseonly.com.cn/upload/mobile_index_image/20190423/1555991501665078962.jpg",
              alt: "1555991501665078962.jpg"
            }
          ]
        }
      ],
      currentId: null
    };
  },
  created() {
    this.currentId = parseInt(this.$route.hash.substr(1, 1));
  }
};
</script>

