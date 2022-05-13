<template>
  <div class="container clearfix">
    <ContentPageFaqPartMenu />
    <div class="postcontent nobottomborder col_last clearfix">
      <h1 class="faq-question-title">{{ faqItem.title }}</h1>
      <p class="block-text-align-j" v-html="faqItem.answer"></p>
      <template v-if="items?.filter(iteratedItem => iteratedItem.id !== faqItem.id)?.length">
        <div id="faqs-list" class="fancy-title title-border-color"></div>
        <h2 class="faq-another-questions topmargin nobottommargin">{{ $trans('faq.other_questions') }}</h2>
        <ContentPageFaqPartList :items="items.filter(iteratedItem => iteratedItem.id !== faqItem.id)" />
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['faqItem']),
    ...mapState('faq', ['items']),
  },
}
</script>
