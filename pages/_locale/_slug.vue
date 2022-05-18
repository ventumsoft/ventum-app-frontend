<template>
  <Fragment>
    <TheTitle
      v-if="pageEntity && ((pageType !== 'Static') || (pageEntity.type !== 'main'))"
      :title="pageEntity.title"
      :breadcrumbs="pageEntity.breadcrumbs"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section id="content" :class="{'no-top-widgets': !$store.state.site.widgets?.page?.top?.length}">
      <div
        class="content-wrap"
        :class="{
          'showcase-widget-container': (pageType === 'Static') && pageEntity && ((pageEntity.type === 'main') || (pageEntity.type === 'contacts')),
          'category-widget-container': pageType === 'ProductCategory',
          'product-widget-container': pageType === 'Product',
          'blog-widget-container': pageType === 'BlogArticle',
          'custom-page-widget-container': pageType === 'Custom',
        }"
        :style="{
          padding: ((pageType === 'BlogMain') || (pageType === 'BlogCategory')) && '60px 0' || '',
          fontSize: (pageType === 'BlogMain') && '15px' || '',
        }"
      >
        <component
          v-if="pageType && (pageType !== 'Static')"
          :is="'ContentPage' + pageType"
        ></component>
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" />
  </Fragment>
</template>

<script>
import {mapState, mapGetters} from "vuex";

export default {
  async asyncData({store, res}) {
    if ((store.state.pageType === 'Error') && res) {
      res.statusCode = 404;
    }
  },
  head() {
    const meta = this.pageEntity?.meta;
    return {
      title: meta?.title,
      meta: meta && [
        meta.description && {
          name: 'description',
          content: meta.description,
        },
        meta.keywords && {
          name: 'keywords',
          content: meta.keywords,
        },
      ].filter(v => v),
    };
  },
  computed: {
    ...mapState('page', {pageType: 'type'}),
    ...mapGetters('page', {pageEntity: 'entity'}),
  },
}
</script>
