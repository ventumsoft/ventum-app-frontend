<template>
  <Fragment>
    <div class="container clearfix product-calculator">
      <ContentPageProductImages />
      <ContentPageProductCalculator v-if="product.calculator" />
    </div>
    <ContentPageProductCreators />
    <ContentPageProductTabs />
  </Fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['product']),
  },
}
</script>
