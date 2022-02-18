<template>
  <Fragment>
    <TheTitle
      v-if="page.entity && ((page.type !== 'Static') || (page.entity.type !== 'main'))"
      :title="page.entity.title"
      :breadcrumbs="page.entity.breadcrumbs"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section id="content" :class="{'no-top-widgets': !$store.state.page.widgets.page?.top?.length}">
      <div
        class="content-wrap"
        :class="{
          'showcase-widget-container': (page.type === 'Page') && page.entity && ((page.entity.type === 'main') || (page.entity.type === 'contacts')),
          'category-widget-container': page.type === 'ProductCategory',
          'product-widget-container': page.type === 'Product',
          'blog-widget-container': page.type === 'BlogArticle',
          'custom-page-widget-container': page.type === 'Custom',
        }"
      >
        <component
          v-if="page.type !== 'Static'"
          :is="'ContentPage' + page.type"
        ></component>
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" />
  </Fragment>
</template>

<script>
import {mapState} from "vuex";

export default {
  async asyncData({store, res}) {
    if ((store.state.page.type === 'Error') && res) {
      res.statusCode = 404;
    }
  },
  computed: {
    ...mapState(['page']),
  },
}
</script>
