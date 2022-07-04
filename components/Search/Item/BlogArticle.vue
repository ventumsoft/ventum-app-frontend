<template>
  <div class="site-search-result-item">
    <TheLink :to="article.url">
      <img
        v-if="(article.img_or_video === 'img') && article.image"
        :src="article.image"
        :srcset="article.image2x && (article.image + ', ' + article.image2x + ' 2x')"
        :alt="article.display_title"
      >
      <div v-else-if="article.img_or_video === 'video'" class="video">
        <i class="icon-play-sign"></i>
      </div>
      <template v-else>
        &bullet;
      </template>
      {{ article.display_title }}
    </TheLink>
  </div>
</template>

<script>
export default {
  props: ['article'],
}
</script>
