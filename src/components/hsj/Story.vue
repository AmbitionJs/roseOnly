<template>
  <div class="story">
    <div class="image">
      <img :src="story.imgSrc" :alt="story.alt">
    </div>
    <h3>{{ story.title }}</h3>
    <h6>{{ story.secondTitle }}</h6>
  </div>
</template>

<style scoped>

</style>


<script>
export default {
  props: ["story"]
};
</script>
