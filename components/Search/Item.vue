<template>
  <component
    v-if="searchSectionItemComponent"
    :is="searchSectionItemComponent"
    v-bind="{[searchSectionItemName]: item}"
  ></component>
</template>

<script>
import SearchSectionEnum from '@/enums/SearchSectionEnum';
import Product from './Item/Product';
import Template from './Item/Template';
import FaqItem from './Item/FaqItem';
import BlogArticle from './Item/BlogArticle';
import Review from './Item/Review';
import Page from './Item/Page';

export default {
  props: [
    'section',
    'item',
  ],
  computed: {
    searchSectionItemComponent() {
      return {
        [SearchSectionEnum.PRODUCTS]: Product,
        [SearchSectionEnum.TEMPLATES]: Template,
        [SearchSectionEnum.FAQ]: FaqItem,
        [SearchSectionEnum.ARTICLES]: BlogArticle,
        [SearchSectionEnum.REVIEWS]: Review,
        [SearchSectionEnum.PAGES]: Page,
      }[this.section];
    },
    searchSectionItemName() {
      return {
        [SearchSectionEnum.PRODUCTS]: 'product',
        [SearchSectionEnum.TEMPLATES]: 'template',
        [SearchSectionEnum.FAQ]: 'faqItem',
        [SearchSectionEnum.ARTICLES]: 'article',
        [SearchSectionEnum.REVIEWS]: 'review',
        [SearchSectionEnum.PAGES]: 'page',
      }[this.section];
    },
  },
}
</script>
