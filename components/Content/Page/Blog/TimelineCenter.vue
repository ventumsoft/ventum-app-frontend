<template>
  <fragment>
    <div id="posts" class="post-grid grid-container post-masonry post-timeline grid-2 clearfix record-timeline timeline-with-center-line">
      <div class="timeline-border"></div>
      <TheIsotope
        v-if="articles?.length"
        :list="articles"
        :options="{itemSelector: '.entry', masonry: {columnWidth: '.entry:not(.entry-date-section)'}}"
      >
        <div ref="entries" v-for="(article, index) of articles" :key="article.id" class="entry clearfix">
          <div class="entry-timeline">
            <div class="timeline-divider"></div>
          </div>
          <ContentPageBlogPartPreview v-bind="{article}" />
          <div class="entry-title">
            <h2>
              <TheLink :to="article.url">
                {{ article.display_title }}
              </TheLink>
            </h2>
          </div>
          <ul class="entry-meta">
            <li class="content-date">
              <i class="icon-calendar3"></i>
              {{ $dt(article.created_at, 'date') }}
            </li>
            <li v-if="article.categories?.length">
              <i class="icon-folder-open"></i>
              <template v-for="(category, index) of article.categories">
                <TheLink :to="category.link">
                  {{ category.title }}
                </TheLink><template v-if="index < article.categories.length - 1">,</template>
              </template>
            </li>
          </ul>
          <div class="entry-content clear-none">
            <p v-html="article.announcement_text"></p>
            <TheLink class="more-link" :to="article.url">
              {{ $trans('blog.more_link') }}
            </TheLink>
          </div>
        </div>
      </TheIsotope>
    </div>
    <ContentPageBlogPartPagination />
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
