<template>
  <div class="container clearfix">
    <ContentPageFaqPartMenu />
    <div class="postcontent nobottomborder col_last clearfix">
      <div id="portfolio" class="faqs">
        <ContentPageFaqPartList v-bind="{items}" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('faq', ['items']),
  },
}
</script>
