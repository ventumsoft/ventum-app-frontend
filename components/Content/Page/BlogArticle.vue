<template>
  <div class="container clearfix">
    <div class="postcontent nobottommargin clearfix">
      <div class="single-post nobottommargin">
        <div class="entry clearfix nobottommargin">
          <div class="entry-title">
            <h1>{{ article.display_title }}</h1>
          </div>
          <ul class="entry-meta clearfix">
            <li class="content-date">
              <i class="icon-calendar3"></i>
              {{ $dt(article.created_at, 'date') }}
            </li>
            <li v-if="article.categories?.length">
              <i class="icon-folder-open"></i>
              <template v-for="(category, index) of article.categories">
                <TheLink :to="category.link">
                  {{ category.title }}
                </TheLink>{{ (index < article.categories.length - 1) ? ',' : '' }}
              </template>
            </li>
          </ul>
          <div class="entry-content notopmargin">
            <div v-if="(article.img_or_video === 'img') && article.image" class="entry-image alignleft">
              <ContentPageBlogPartImage v-bind="{article}" />
            </div>
            <div v-else-if="(article.img_or_video === 'video') && article.video" class="entry-image entry-video">
              <ContentPageBlogPartYoutube v-if="article.video.includes('youtu')" v-bind="{article}" />
              <ContentPageBlogPartVideo v-else v-bind="{article}" />
            </div>
            <div class="no-fv" v-html="article.content"></div>
            <div class="clear"></div>
            <TheShare
              class="noborder"
              :label="$trans('blog.share')"
              :url="article.url"
              :title="article.display_title"
            />
          </div>
        </div>
        <div class="post-navigation clearfix">
          <div class="col_half nobottommargin">
            <TheLink v-if="article.prevUrl" :to="article.prevUrl">
              <fragment v-html="$trans('blog.preview_page')"></fragment>
            </TheLink>
          </div>
          <div class="col_half col_last tright nobottommargin">
            <TheLink v-if="article.nextUrl" :to="article.nextUrl">
              <fragment v-html="$trans('blog.next_page')"></fragment>
            </TheLink>
          </div>
        </div>
      </div>
    </div>
    <ContentPageBlogPartSidebar />
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', {article: 'blogArticle'}),
  },
}
</script>
