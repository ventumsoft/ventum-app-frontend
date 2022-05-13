<template>
  <div class="container clearfix" :class="{'blog-category-container': $store.state.page.type === 'BlogCategory'}">
    <component :is="blogTypeViewComponent" />
  </div>
</template>

<script>
import BlogTypeViewEnum from '@/enums/BlogTypeViewEnum';

import ListView from './BlogList/ListView';
import TimelineLeft from './BlogList/TimelineLeft';
import TimelineCenter from './BlogList/TimelineCenter';

export default {
  computed: {
    blogDisplayType() {
      return this.$store.state.page.blogCategory?.display_type ||
        this.$store.state.page.page?.display_type ||
        BlogTypeViewEnum.WITH_TIMELINE_CENTER;
    },
    blogTypeViewComponent() {
      return {
        [BlogTypeViewEnum.LIST_VIEW]: ListView,
        [BlogTypeViewEnum.WITH_TIMELINE_LEFT]: TimelineLeft,
        [BlogTypeViewEnum.WITH_TIMELINE_CENTER]: TimelineCenter,
      }[this.blogDisplayType];
    },
  },
  async fetch() {
    await Promise.all([
      this.$store.dispatch('blog/fetchArticles'),
      !this.$store.state.blog.categories && this.$store.dispatch('blog/fetchCategories'),
      !this.$store.state.blog.recentArticles && this.$store.dispatch('blog/fetchRecentArticles'),
    ].filter(v => v));
  },
  watch: {
    '$route.query.page'() {
      this.$store.dispatch('blog/fetchArticles');
    },
  },
}
</script>
