<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemLastNewsAndBlog">
    <div class="col_two_third nobottommargin" style="margin-top: 30px;">
      <div class="fancy-title title-border notopmargin">
        <h3 v-html="news_title"></h3>
      </div>
      <div
        v-for="(blog_item, index) of blog_items"
        class="col_half nobottommargin"
        :class="{col_last: index % 2 === 1}"
        :data-id="blog_item.id"
      >
        <div class="ipost clearfix">
          <div v-if="(blog_item.img_or_video === 'img') && blog_item.image" class="entry-image">
            <TheLink :to="blog_item.url">
              <img
                :src="blog_item.image || '/images/no-image.png'"
                :srcset="(blog_item.image || '/images/no-image.png') + ', ' + (blog_item.image2x || '/images/no-image.png') + ' 2x'"
                loading="lazy"
                :alt="blog_item.meta_title"
              >
            </TheLink>
          </div>
          <div v-else-if="(blog_item.img_or_video === 'video') && blog_item.video" class="entry-image entry-video">
            <iframe
              v-if="blog_item.video.includes('youtu')"
              class="image_fade alignleft"
              width="357" height="210"
              frameborder="0" allowfullscreen
              :src="blog_item.video"
            >
            </iframe>
            <video v-else width="357" height="210" autoplay>
              <source :src="blog_item.video">
            </video>
          </div>
          <div class="entry-title">
            <h3><TheLink :to="blog_item.url">{{ blog_item.display_title }}</TheLink></h3>
          </div>
          <ul class="entry-meta">
            <li class="content-date"><i class="icon-calendar3"></i> {{ blog_item.created_at }}</li>
          </ul>
          <br/>
          <div class="entry-content clear-both">
            <TheLink :to="blog_item.url" class="blog-announcement-link"><p v-html="blog_item.announcement_text"></p></TheLink>
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
          v-for="popular_item of popular_items"
          class="spost clearfix"
          :data-id="popular_item.id"
        >
          <div v-if="(popular_item.img_or_video === 'img') && popular_item.image" class="entry-image">
            <div class="entry-image">
              <TheLink :to="popular_item.url">
                <img
                  :src="popular_item.image || '/images/no-image.png'"
                  :srcset="(popular_item.image || '/images/no-image.png') + ', ' + (popular_item.image2x || '/images/no-image.png') + ' 2x'"
                  :alt="popular_item.meta_title"
                  loading="lazy"
                  style="object-fit: contain;"
                >
              </TheLink>
            </div>
          </div>
          <div v-if="(popular_item.img_or_video === 'video') && popular_item.video" class="entry-image entry-video">
            <iframe
              v-if="popular_item.video.includes('youtu')"
              class="image_fade alignleft" width="500" height="281"
              frameborder="0" allowfullscreen
              :src="popular_item.video"
            >
            </iframe>
            <video v-else width="500" height="281" autoplay>
              <source :src="popular_item.video">
            </video>
          </div>
          <div class="entry-c">
            <div class="entry-title">
              <h4>
                <TheLink :to="popular_item.url">{{ popular_item.display_title }}</TheLink>
              </h4>
            </div>
            <ul class="entry-meta">
              <li class="content-date"><i class="icon-calendar3"></i> {{ popular_item.created_at }}</li>
            </ul>
          </div>
        </div>

        <TheLink v-if="blog_items.length" :to="blog_url" class="more-link fright">
          site/widgets.last_news_and_blog_preview.read_blog
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
