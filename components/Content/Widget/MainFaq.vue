<template>
  <div v-if="items?.length" class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemMainFaq">
    <div class="fancy-title title-border title-center">
      <h3 v-html="title"></h3>
    </div>
    <div class="accordion clearfix" data-state="first">
      <template v-for="(item, itemIndex) of items">
        <div class="acctitle" :class="{acctitlec: currentItemIndex === itemIndex}" @click="chooseItem(itemIndex)">
          <i class="acc-closed icon-line-circle-plus"></i><i class="acc-open icon-line-circle-check color"></i>
          {{ item.question }}
        </div>
        <div ref="contents" class="acc_content clearfix block-text-align-j" v-html="item.answer"></div>
      </template>
      <TheLink :to="link" class="more-link fright">
        {{ $trans('widgets.mainthem_main_faq.all_questions') }}
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
  data: () => ({
    currentItemIndex: 0,
  }),
  mounted() {
    $(this.$refs.contents).filter(':not(:eq(0))').hide();
  },
  methods: {
    chooseItem(itemIndex) {
      if (itemIndex === this.currentItemIndex) {
        return;
      }
      $(this.$refs.contents[this.currentItemIndex]).slideUp();
      this.currentItemIndex = itemIndex;
      $(this.$refs.contents[itemIndex]).slideDown();
    },
  },
}
</script>
