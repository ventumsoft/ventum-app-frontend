<template>
  <Fragment>
    <TheLink
      v-for="faqItem of faqItems"
      :key="faqItem.id"
      class="faqtitle"
      style="width: 100%"
      :to="faqItem.link + (faqCategory ? ('?category_id=' + faqCategory.id) : '')"
    >
      <div>
        <i class="icon-caret-right"></i>
        {{ faqItem.title }}
      </div>
    </TheLink>
  </Fragment>
</template>

<script>
export default {
  props: {
    faqCategory: {type: Object},
    faqItems: {type: Array},
  },
}
</script>
