<template>
  <ul class="process-steps bottommargin clearfix">
    <li class="active" data-step="cart-step">
      <a href="#" class="i-circled i-bordered i-alt divcenter"  @click.prevent>1</a>
      <h5>{{ $trans('checkout.goods_step_title') }}</h5>
    </li>
    <li :class="{disabled: !items.length}" data-action="change-step" data-step="delivery">
      <a href="#" class="i-circled i-bordered i-alt divcenter"  @click.prevent>2</a>
      <h5>{{ $trans('checkout.delivery_step_title') }}</h5>
    </li>
    <li class="disabled" data-step="payment-step">
      <a href="#" class="i-circled i-bordered i-alt divcenter" @click.prevent>3</a>
      <h5>{{ $trans('checkout.payment_step_title') }}</h5>
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('cart', ['items']),
  },
}
</script>
