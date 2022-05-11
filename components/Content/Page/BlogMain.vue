<template>
  <div class="container clearfix">
    <component :is="blogTypeViewComponent" />
  </div>
</template>

<script>
import BlogTypeViewEnum from '@/enums/BlogTypeViewEnum';

import ListView from './BlogMain/ListView';
import TimelineLeft from './BlogMain/TimelineLeft';
import TimelineCenter from './BlogMain/TimelineCenter';

export default {
  data: () => ({
    BlogTypeViewEnum,
  }),
  computed: {
    blogDisplayType() {
      return this.$store.state.page.page.display_type || BlogTypeViewEnum.WITH_TIMELINE_CENTER;
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
    await this.$store.dispatch('blog/fetch');
  },
}
</script>
