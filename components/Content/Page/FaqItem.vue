<template>
  <div class="container clearfix">
    <ContentPageFaqMenu />
    <div class="postcontent nobottomborder col_last clearfix">
      <h1 class="faq-question-title">{{ faqItem.question }}</h1>
      <p class="block-text-align-j" v-html="faqItem.answer"></p>
      <template v-if="faqItem.faqItems?.length">
        <div id="faqs-list" class="fancy-title title-border-color"></div>
        <h2 class="faq-another-questions topmargin nobottommargin">site/faq.other_questions</h2>
        <ContentPageFaqList />
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', [
      'faqItem',
      'faqItems',
    ]),
  },
}
</script>
