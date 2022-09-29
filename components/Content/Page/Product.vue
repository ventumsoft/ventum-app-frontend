<template>
  <Fragment>
    <div v-if="product.meta?.microdata" class="hidden" itemscope itemtype="http://schema.org/Product">
      <meta itemprop="name" :content="product.meta.microdata.name">
      <meta itemprop="description" :content="product.meta.microdata.description">
      <meta itemprop="image" :content="product.meta.microdata.image">
      <div class="hidden" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <meta itemprop="priceCurrency" :content="product.meta.microdata.currency">
        <meta itemprop="price" :content="product.meta.microdata.price">
        <link itemprop="availability" href="https://schema.org/InStock">
      </div>
    </div>
    <div class="container clearfix product-calculator">
      <ContentPageProductImages />
      <ContentPageProductCalculator />
    </div>
    <ContentPageProductCreators />
    <ContentPageProductCreatorsEmbeddedModal />
    <ContentPageProductTabs />
  </Fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['product']),
  },
  beforeMount() {
    this.$store.commit('product/initEmptyParams');
  },
}
</script>
