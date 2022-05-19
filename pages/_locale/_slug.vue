<template>
  <Fragment>
    <TheTitle
      v-if="pageEntity && ((pageType !== 'Static') || (pageEntity.type !== 'main'))"
      :title="pageEntity.title"
      :breadcrumbs="pageEntity.breadcrumbs"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section
      id="content"
      :class="{'no-top-widgets': !$store.state.site.widgets?.page?.top?.length}"
      :style="{
        fontSize: ((pageType === 'BlogMain') || (pageType === 'Custom') || (pageType === 'FaqItem')) && '15px' || '',
      }"
    >
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
  async asyncData({store, error}) {
    if (store.state.page.type === 'Error') {
      error({statusCode: 404});
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
  async fetch() {
    if ((this.pageType === 'BlogMain') || (this.pageType === 'BlogCategory')) {
      await this.$store.dispatch('blog/fetchArticles');
    }
    if ((this.pageType === 'BlogMain') || (this.pageType === 'BlogCategory') || (this.pageType === 'BlogArticle')) {
      await Promise.all([
        !this.$store.state.blog.categories && this.$store.dispatch('blog/fetchCategories'),
        !this.$store.state.blog.recentArticles && this.$store.dispatch('blog/fetchRecentArticles'),
      ].filter(v => v));
    }
    if ((this.pageType === 'FaqMain') || (this.pageType === 'FaqCategory')) {
      await this.$store.dispatch('faq/fetchItems', {
        favorite: (this.pageType === 'FaqMain') || undefined,
        categoryId: (this.pageType === 'FaqCategory') && this.$store.state.page.faqCategory?.id || undefined,
      });
    }
    if (this.pageType === 'FaqItem') {
      if (this.$route.query.category_id) {
        await this.$store.dispatch('faq/fetchItems', {
          categoryId: this.$route.query.category_id || undefined,
        });
      } else {
        this.$store.commit('faq/setItems', null);
      }
    }
    if ((this.pageType === 'FaqMain') || (this.pageType === 'FaqCategory') || (this.pageType === 'FaqItem')) {
      await Promise.all([
        !this.$store.state.faq.categories && this.$store.dispatch('faq/fetchCategories'),
      ].filter(v => v));
    }
  },
}
</script>
