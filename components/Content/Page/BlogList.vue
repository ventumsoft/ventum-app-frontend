<template>
  <div class="container clearfix" :class="{'blog-category-container': $store.state.page.type === 'BlogCategory'}">
    <component :is="blogTypeViewComponent" />
  </div>
</template>

<script>
import BlogTypeViewEnum from '@/enums/BlogTypeViewEnum';

import ListView from './Blog/ListView';
import TimelineLeft from './Blog/TimelineLeft';
import TimelineCenter from './Blog/TimelineCenter';

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
}
</script>
