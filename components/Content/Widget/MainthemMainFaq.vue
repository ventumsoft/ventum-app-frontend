<template>
  <div v-if="items?.length" class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemMainFaq">
    <div class="fancy-title title-border title-center">
      <h3 v-html="title"></h3>
    </div>
    <div class="accordion clearfix" data-state="first">
      <template v-for="item of items">
        <div class="acctitle">
          <i class="acc-closed icon-line-circle-plus"></i><i class="acc-open icon-line-circle-check color"></i>
          {{ item.question }}
        </div>
        <div class="acc_content clearfix block-text-align-j" v-html="item.answer"></div>
      </template>
      <TheLink :to="link" class="more-link fright">
        site/widgets.mainthem_main_faq.all_questions
      </TheLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    link: {type: String},
    items: {type: Array},
  },
}
</script>
