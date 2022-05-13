<template>
  <div v-if="(article.img_or_video === 'img') && article.image || (article.img_or_video === 'video') && article.video" class="entry-image">
    <TheLink :to="article.url">
      <ContentPageBlogListPartImage
        v-if="(article.img_or_video === 'img') && article.image"
        v-bind="{article}"
      />
      <template v-else-if="(article.img_or_video === 'video') && article.video">
        <ContentPageBlogListPartYoutube
          v-if="article.video.includes('youtu')"
          v-bind="{article}"
        />
        <ContentPageBlogListPartVideo
          v-else
          v-bind="{article}"
        />
      </template>
    </TheLink>
  </div>
</template>

<script>
export default {
  props: {
    article: {type: Object},
  },
}
</script>
