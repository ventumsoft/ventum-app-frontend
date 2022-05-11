<template>
  <img
    class="image_fade"
    :src="article.image || '/images/no-image.png'"
    :srcset="article.image && article.image2x && (article.image + ', ' + article.image2x + ' 2x')"
    :alt="article.display_title"
  >
</template>

<script>
export default {
  props: {
    article: {type: Object},
  },
}
</script>
