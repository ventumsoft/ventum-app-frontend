<template>
  <fragment>
    <div id="posts" class="post-grid grid-container post-masonry post-timeline grid-2 clearfix record-timeline timeline-with-center-line">
      <div class="timeline-border"></div>
      <div v-for="article of articles" class="entry clearfix">
        <div class="entry-timeline">
          <div class="timeline-divider"></div>
        </div>
        <ContentPageBlogMainPartPreview v-bind="{article}" />
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
            {{ article.created_at }}
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
          <a href="#" class="more-link" @click.prevent="$store.dispatch('blog/fetch', {page: page + 1, append: true})">
            {{ $trans('blog.more_link') }}
          </a>
        </div>
      </div>
    </div>
    <ContentPageBlogMainPartPagination />
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
