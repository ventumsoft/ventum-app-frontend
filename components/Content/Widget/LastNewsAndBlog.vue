<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemLastNewsAndBlog">
    <div class="col_two_third nobottommargin" style="margin-top: 30px;">
      <div class="fancy-title title-border notopmargin">
        <h3 v-html="news_title"></h3>
      </div>
      <div
        v-for="(article, index) of blog_items"
        class="col_half nobottommargin"
        :class="{col_last: index % 2 === 1}"
        :data-id="article.id"
      >
        <div class="ipost clearfix">
          <div v-if="(article.img_or_video === 'img') && article.image" class="entry-image">
            <TheLink :to="article.url">
              <img
                :src="article.image"
                :srcset="article.image2x && (article.image + ', ' + article.image2x + ' 2x')"
                loading="lazy"
                :alt="article.meta_title"
              >
            </TheLink>
          </div>
          <div v-else-if="(article.img_or_video === 'video') && article.video" class="entry-image entry-video">
            <iframe
              v-if="article.video.includes('youtu')"
              class="image_fade alignleft"
              width="357" height="210"
              frameborder="0" allowfullscreen
              :src="article.video"
            >
            </iframe>
            <video v-else width="357" height="210" autoplay>
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
            <TheLink :to="article.url" class="blog-announcement-link"><p v-html="article.announcement_text"></p></TheLink>
          </div>
        </div>
      </div>
    </div>

    <div class="col_one_third nobottommargin col_last" style="margin-top: 30px;">
      <div class="fancy-title title-border notopmargin">
        <h3 v-html="blog_title"></h3>
      </div>
      <div id="home-recent-news">
        <div
          v-for="article of popular_items"
          class="spost clearfix"
          :data-id="article.id"
        >
          <div v-if="(article.img_or_video === 'img') && article.image" class="entry-image">
            <div class="entry-image">
              <TheLink :to="article.url">
                <img
                  :src="article.image"
                  :srcset="article.image2x && (article.image + ', ' + article.image2x + ' 2x')"
                  :alt="article.meta_title"
                  loading="lazy"
                  style="object-fit: contain;"
                >
              </TheLink>
            </div>
          </div>
          <div v-if="(article.img_or_video === 'video') && article.video" class="entry-image entry-video">
            <iframe
              v-if="article.video.includes('youtu')"
              class="image_fade alignleft" width="500" height="281"
              frameborder="0" allowfullscreen
              :src="article.video"
            >
            </iframe>
            <video v-else width="500" height="281" autoplay>
              <source :src="article.video">
            </video>
          </div>
          <div class="entry-c">
            <div class="entry-title">
              <h4>
                <TheLink :to="article.url">{{ article.display_title }}</TheLink>
              </h4>
            </div>
            <ul class="entry-meta">
              <li class="content-date"><i class="icon-calendar3"></i> {{ article.created_at }}</li>
            </ul>
          </div>
        </div>

        <TheLink v-if="blog_items.length" :to="blog_url" class="more-link fright">
          {{ $trans('widgets.last_news_and_blog_preview.read_blog') }}
        </TheLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news_title: {type: String},
    blog_title: {type: String},
    blog_items: {type: Array},
    popular_items: {type: Array},
    blog_url: {type: String},
  },
}
</script>
