<template>
  <div class="tab-content">
    <template v-if="items.length">cart contents</template>
    <div v-else class="cart-empty-block">
      <div class="alert alert-info">{{ $trans('checkout.empty_cart') }}</div>
      <div class="row clearfix">
        <div class="col-md-12">
          <TheLink :to="$page({name: 'locale'})" class="button button-rounded button-reveal button-amber notopmargin pull-right">
            <i class="icon-arrow-left2"></i>
            <span>{{ $trans('checkout.goods_step.order_more_btn') }}</span>
          </TheLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('cart', ['items']),
  },
}
</script>
