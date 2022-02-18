<template>
  <div class="container clearfix">
    <ContentPageFaqMenu
      :categories="faqCategory.faqCategories"
      :current-category-id="faqCategory.id"
    />
    <div class="postcontent nobottomborder col_last clearfix">
      <div id="portfolio" class="faqs">
        <ContentPageFaqList
          v-if="faqCategory.items?.length"
          :faq-category="faqCategory"
          :faq-items="faqCategory.items"
        ></ContentPageFaqList>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('page', {faqCategory: 'entity'}),
  },
}
</script>
