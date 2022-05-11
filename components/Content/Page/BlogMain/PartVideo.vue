<template>
  <video width="500" height="281" autoplay>
    <source :src="article.video">
  </video>
</template>

<script>
export default {
  props: {
    article: {type: Object},
  },
}
</script>
