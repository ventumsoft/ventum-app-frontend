<template>
  <Fragment>
    <template v-if="pageType"><PageTitle
      v-if="pageEntity && ((pageType !== 'Static') || (pageEntity.type !== 'main'))"
      :title="pageEntity.meta?.h1 || pageEntity.title"
      :breadcrumbs="pageEntity.breadcrumbs"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section
      id="content"
      :class="{'no-top-widgets': !$store.state.widgets.page.top?.length}"
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
          :key="'ContentPage' + pageType + '#' + pageEntity.id"
        ></component>
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" /></template>
    <NuxtChild v-else />
  </Fragment>
</template>

<script>
import {mapState, mapGetters} from "vuex";

export default {
  async middleware({route, params, store, $axios, error}) {
    if (route.name !== 'slug') {
      store.commit('widgets/update', {page: null});
      store.commit('page/set', {slug: params.slug});
      return;
    }
    if (store.state.page.type && (params.slug === store.state.page.slug)) {
      return;
    }
    try {
      const {data: {
        widgets,
        ...data
      }} = await $axios.get('page/data', {params: {locale: params.locale, slug: params.slug}});
      store.commit('widgets/update', {page: widgets});
      store.commit('page/set', {slug: params.slug, ...data});
    } catch (exception) {
      error({
        statusCode: exception.response.status,
        message: exception.response.statusText,
      });
    }
  },
  async asyncData({route, params, store}) {
    const pageType = store.state.page.type;
    if ((pageType === 'BlogMain') || (pageType === 'BlogCategory')) {
      await store.dispatch('blog/fetchArticles', {
        categoryId: store.state.page.blogCategory?.id || Number(route.query.category_id) || undefined,
        page: Number(route.query.page || 1),
        append: Boolean(params.append),
      });
    }
    if ((pageType === 'BlogMain') || (pageType === 'BlogCategory') || (pageType === 'BlogArticle')) {
      await Promise.all([
        !store.state.blog.categories && store.dispatch('blog/fetchCategories'),
        !store.state.blog.recentArticles && store.dispatch('blog/fetchRecentArticles'),
      ].filter(v => v));
    }
    if ((pageType === 'FaqMain') || (pageType === 'FaqCategory')) {
      await store.dispatch('faq/fetchItems', {
        favorite: (pageType === 'FaqMain') || undefined,
        categoryId: (pageType === 'FaqCategory') && store.state.page.faqCategory?.id || undefined,
      });
    }
    if (pageType === 'FaqItem') {
      if (route.query.category_id) {
        await store.dispatch('faq/fetchItems', {
          categoryId: route.query.category_id || undefined,
        });
      } else {
        store.commit('faq/setItems', null);
      }
    }
    if ((pageType === 'FaqMain') || (pageType === 'FaqCategory') || (pageType === 'FaqItem')) {
      await Promise.all([
        !store.state.faq.categories && store.dispatch('faq/fetchCategories'),
      ].filter(v => v));
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
  watchQuery: true,
}
</script>
