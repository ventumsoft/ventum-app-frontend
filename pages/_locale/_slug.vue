<template>
  <component
    :is="pageType ? 'ContentPage' : 'NuxtChild'"
  />
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
    if ((from?.name === 'slug') && store.state.page.type &&
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
      store.commit('widgets/preload', {page: widgets});
      store.commit('page/set', {slug: params.slug, ...data});
    } catch (exception) {
      return;
    }
    if (process.server) {
      store.commit('widgets/update', {preload: null, ...store.state.widgets.preload});
    }
  },
  async asyncData({route, params, store}) {
    store.commit('widgets/update', {preload: null, ...store.state.widgets.preload});
    if (!process.server) {
      store.dispatch('widgets/loadPageRemnantMiddleWidgetsIfNeeded');
    }
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
