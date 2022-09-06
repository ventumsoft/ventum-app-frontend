<template>
  <Fragment>
    <div v-if="(pageType === 'Product') && pageEntity.meta?.microdata" class="hidden" itemscope itemtype="http://schema.org/Product">
      <meta itemprop="name" :content="pageEntity.meta.microdata.name">
      <meta itemprop="description" :content="pageEntity.meta.microdata.description">
      <meta itemprop="image" :content="pageEntity.meta.microdata.image">
      <div class="hidden" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <meta itemprop="priceCurrency" :content="pageEntity.meta.microdata.currency">
        <meta itemprop="price" :content="pageEntity.meta.microdata.price">
        <link itemprop="availability" href="https://schema.org/InStock">
      </div>
    </div>
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
          :key="$store.state.site.language.slug + '-' + pageType + '-' + pageEntity.id"
        ></component>
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" /></template>
    <NuxtChild v-else />
  </Fragment>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
  async middleware({from, route, params, store, $axios, redirect}) {
    if (route.name !== 'slug') {
      store.commit('widgets/update', {page: null});
      store.commit('page/set', {slug: params.slug});
      return;
    }
    if (from && store.state.page.type &&
      (params.locale === from.params.locale) &&
      (params.slug === from.params.slug)
    ) {
      return;
    }
    try {
      const {data: {
        redirectSlug,
        widgets,
        ...data
      }} = await $axios.get('page/data', {
        params: {slug: params.slug},
        showErrorPageOnException: true,
      });
      if (redirectSlug) {
        return redirect({...route, params: {...params, slug: redirectSlug}});
      }
      store.commit('widgets/update', {page: widgets});
      store.commit('page/set', {slug: params.slug, ...data});
    } catch (exception) {
      return;
    }
    if (!process.server) {
      store.dispatch('widgets/loadPageRemnantMiddleWidgetsIfNeeded');
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
      link: meta && [
        meta.canonical && {rel: 'canonical', href: meta.canonical},
      ].filter(v => v),
      meta: meta && [
        meta.description && {
          name: 'description',
          content: meta.description,
        },
        meta.keywords && {
          name: 'keywords',
          content: meta.keywords,
        },
        ...(meta.og && Object.entries(meta.og).map(([key, value]) => ({
          property: 'og:' + key,
          content: value,
        })) || []),
      ].filter(v => v),
      script: [
        (this.pageType === 'Product') && this.pageEntity?.calculator && this.$store.state.site.settings?.['seo-integration:gads-dynamic-remarketing:enabled'] && {body: true, innerHTML: `
          window.dataLayer = window.dataLayer || [];
          dataLayer.push(${JSON.stringify({
            event: 'view_item',
            value: this.pageEntity.calculator.basicPriceValue,
            items: [{
              id: this.pageEntity.id + '-' + this.$store.state.site.language.id,
              google_business_vertical: 'retail',
            }],
          })});
        `},
      ].filter(v => v),
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
  computed: {
    ...mapState('page', {pageType: 'type'}),
    ...mapGetters('page', {pageEntity: 'entity'}),
  },
  mounted() {
    this.$store.dispatch('widgets/loadPageRemnantMiddleWidgetsIfNeeded');
  },
  watchQuery: true,
}
</script>
