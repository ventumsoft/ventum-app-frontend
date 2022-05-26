<template>
  <Fragment>
    <div class="container clearfix product-calculator">
      <ContentPageProductImages />
      <ContentPageProductCalculator />
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
