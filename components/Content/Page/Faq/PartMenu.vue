<template>
  <div class="sidebar clearfix">
    <ul class="faq-filter clearfix">
      <li
        v-for="category of categories"
        :class="{activeFilter: ($store.state.page.faqCategory?.id || Number($route.query.category_id)) === category.id}"
      >
        <TheLink :to="category.link">
          {{ category.title }}
        </TheLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('faq', ['categories']),
  },
}
</script>
