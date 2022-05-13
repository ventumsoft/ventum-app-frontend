<template>
  <fragment>
    <div class="postcontent nobottommargin clearfix">
      <div id="posts" class="small-thumbs record-timeline">
        <div v-for="article of articles" class="entry clearfix">
          <ContentPageBlogListPartPreview v-bind="{article}" />
          <div class="entry-c">
            <div class="entry-title">
              <h2>
                <TheLink :to="article.url">
                  {{ article.display_title }}
                </TheLink>
              </h2>
            </div>
            <ul class="entry-meta clearfix">
              <li class="content-date">
                <i class="icon-calendar3"></i>
                {{ article.created_at }}
              </li>
              <li v-if="article.categories?.length">
                <i class="icon-folder-open"></i>
                <template v-for="(category, index) in article.categories">
                  <TheLink :to="category.link">
                    {{ category.title }}
                  </TheLink><template v-if="index < article.categories.length - 1">,</template>
                </template>
              </li>
            </ul>
            <br/>
            <div class="entry-content clear-none">
              <p v-html="article.announcement_text"></p>
              <TheLink :to="article.url" class="more-link">
                {{ $trans('blog.more_link') }}
              </TheLink>
            </div>
          </div>
        </div>
      </div>
      <ContentPageBlogListPartPagination />
    </div>
    <ContentPageBlogListPartSidebar />
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('blog', ['page', 'articles']),
  },
}
</script>
