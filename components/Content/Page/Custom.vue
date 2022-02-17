<template>
  <div class="container clearfix">
    <template v-if="page.category">
      <div class="sidebar clearfix">
        <ul class="faq-filter clearfix">
          <li v-for="iteratedPage of page.category.pages" :class="{activeFilter: iteratedPage.id === page.id}">
            <TheLink :to="iteratedPage.link">
              {{ iteratedPage.title }}
            </TheLink>
          </li>
        </ul>
      </div>
      <div class="postcontent col_last nobottomborder clearfix no-fv">
        <article v-html="page.content"></article>
      </div>
    </template>
    <template v-else>
      <div class="nobottomborder clearfix no-fv">
        <article v-html="page.content"></article>
      </div>
    </template>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('page', {page: 'entity'}),
  },
}
</script>
