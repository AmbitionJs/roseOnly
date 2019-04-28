<template>
  <div class="story">
    <router-link to>
      <div class="image">
        <img :src="story.imgSrc" :alt="story.alt">
      </div>
      <h3>{{ story.title }}</h3>
      <h6>{{ story.secondTitle }}</h6>
    </router-link>
  </div>
</template>

<style scoped>
.image {
  width: 285px;
  height: 285px;
  overflow: hidden;
  display: inline-block;
}
h3,
h6 {
  color: #000;
}
h3 {
  line-height: 25px;
  height: 20px;
  padding-top: 20px;
  font-size: 16px;
}
h6 {
  font-size: 14px;
  line-height: 24px;
  margin: 0 0 15px 0;
  font-weight: 300;
}
img {
  transition: all 0.5s;
  transform: scale(1, 1);
}
img:hover {
  transform: scale(1.1, 1.1);
}
</style>


<script>
export default {
  props: ["story"]
};
</script>
