<template>
    <div class="story">
        <img :src="story.imgSrc" alt="">

    </div>
</template>

<script>
export default {
    props: [
        'story',
    ]
}
</script>
