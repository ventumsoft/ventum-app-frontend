<template>
  <div class="sidebar nobottommargin col_last clearfix">
    <div class="sidebar-widgets-wrap">
        <div v-if="categories?.length" class="widget widget_links clearfix">
        <h4>{{ $trans('blog.categories') }}</h4>
        <ul>
          <li v-for="category of categories">
            <TheLink :to="category.link" :class="{active: $store.state.page.blogCategory?.id === category.id}">
              {{ category.title }}
            </TheLink>
          </li>
        </ul>
      </div>
      <div v-if="recentArticles?.length" class="widget clearfix">
        <h4>{{ $trans('blog.last_blogs') }}</h4>
        <div id="post-list-footer">
          <div v-for="article of recentArticles" class="spost clearfix">
            <div v-if="(article.img_or_video === 'img') && article.image" class="entry-image">
              <TheLink :to="article.url" class="nobg">
                <img
                  :src="article.image || '/images/no-image.png'"
                  :srcset="article.image && article.image2x && (article.image + ', ' + article.image2x + ' 2x')"
                  :alt="article.display_title"
                  style="object-fit: contain;"
                >
              </TheLink>
            </div>
            <div v-else-if="(article.img_or_video === 'video') && article.video" class="entry-image entry-video">
              <ContentPageBlogListPartYoutube
                v-if="article.video.includes('youtu')"
                v-bind="{article}"
              />
              <ContentPageBlogListPartVideo
                v-else
                v-bind="{article}"
              />
            </div>
            <div class="entry-c">
              <div class="entry-title">
                <h4>
                  <TheLink :to="article.url">
                    {{ article.display_title }}
                  </TheLink>
                </h4>
              </div>
              <ul class="entry-meta">
                <li class="content-date">{{ article.created_at }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('blog', ['categories', 'recentArticles']),
  },
}
</script>
