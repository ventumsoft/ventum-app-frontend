<template>
  <div class="sidebar clearfix">
    <ul class="faq-filter clearfix">
      <li v-for="iteratedCategory of faqCategories" :class="{activeFilter: iteratedCategory.id === faqCategory?.id}">
        <TheLink :to="iteratedCategory.link">
          {{ iteratedCategory.title }}
        </TheLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('page', [
      'faqCategory',
      'faqCategories',
    ]),
  },
}
</script>
