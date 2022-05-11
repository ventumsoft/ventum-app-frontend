<template>
  <div v-if="(article.img_or_video === 'img') && article.image || (article.img_or_video === 'video') && article.video" class="entry-image">
    <TheLink :to="article.url">
      <ContentPageBlogMainPartImage
        v-if="(article.img_or_video === 'img') && article.image"
        v-bind="{article}"
      />
      <template v-else-if="(article.img_or_video === 'video') && article.video">
        <ContentPageBlogMainPartYoutube
          v-if="article.video.includes('youtu')"
          v-bind="{article}"
        />
        <ContentPageBlogMainPartVideo
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
