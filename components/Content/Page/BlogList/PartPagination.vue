<template>
  <div class="center pagination-with-button">
    <div v-if="page < pages" id="load-next-posts" class="center">
      <a
        href="#"
        class="button button-large pagination-download-more-button"
        @click.prevent="$store.dispatch('blog/fetchArticles', {page: page + 1, append: true});"
      >
        <div class="form-process" style="left: 0;" :style="{display: loading ? 'block' : 'none'}"></div>
        {{ $trans('blog.pagination.button.download_more_news') }}
      </a>
    </div>
    <ThePagination
      :pagesCount="pages"
      :currentPage="page"
      :routeBuilder="page => $route.path + '?page=' + page"
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
