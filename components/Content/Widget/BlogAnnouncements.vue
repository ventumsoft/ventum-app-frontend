<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemBlogAnnouncements">
    <div class="fancy-title title-border title-center notopmargin">
      <h3 v-html="title"></h3>
    </div>
    <div
      v-for="(article, index) of articles"
      class="nobottommargin"
      :class="[columnClass, (index === articles.length - 1 ? 'col_last' : null)].filter(v => v)"
      :data-id="article.id"
    >
      <div class="ipost clearfix">
        <div v-if="(article.img_or_video === 'img') && article.image" class="entry-image">
          <TheLink :to="article.url" :style="{height: imgHeight + 'px'}">
            <img
              class="image_fade"
              :src="article.image"
              :srcset="article.image2x && (article.image + ', ' + article.image2x + ' 2x')"
              :alt="article.meta_title"
              :style="{maxHeight: imgHeight + 'px'}"
            >
          </TheLink>
        </div>
        <div v-else-if="(article.img_or_video === 'video') && article.video" class="entry-image entry-video">
          <iframe
            v-if="article.video.includes('youtu')"
            class="image_fade alignleft" width="349" height="210"
            frameborder="0" allowfullscreen
            :src="article.video"
          >
          </iframe>
          <video v-else width="349" height="210" autoplay>
            <source :src="article.video">
          </video>
        </div>
        <div class="entry-title">
          <h3><TheLink :to="article.url">{{ article.display_title }}</TheLink></h3>
        </div>
        <ul class="entry-meta">
          <li class="content-date"><i class="icon-calendar3"></i> {{ article.created_at }}</li>
        </ul>
        <br/>
        <div class="entry-content clear-both">
          <TheLink :to="article.url" class="blog-announcement-link">
            <p v-html="article.announcement_text"></p>
          </TheLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    articles: {type: Array},
    columnClass: {type: String},
    imgHeight: {type: Number},
  },
}
</script>
