<template>
  <Fragment>
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
