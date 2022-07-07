<template>
  <div class="center pagination-with-button">
    <div v-if="page < pages" id="load-next-posts" class="center">
      <TheLink
        :to="$page({...$route, params: {...$route.params, append: true}, query: {...$route.query, page: page + 1}})"
        class="button button-large pagination-download-more-button"
      >
        <div v-if="loading" class="form-process" style="left: 0;"></div>
        {{ $trans('blog.pagination.button.download_more_news') }}
      </TheLink>
    </div>
    <ThePagination
      :pagesCount="pages"
      :currentPage="page"
      :routeBuilder="page => $page({...$route, params: {...$route.params, append: undefined}, query: {...$route.query, page}})"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('blog', ['loading', 'page', 'pages']),
  },
}
</script>
