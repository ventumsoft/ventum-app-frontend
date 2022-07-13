<template>
  <ul class="process-steps bottommargin clearfix">
    <li
      v-for="(step, stepIndex) of steps"
      :class="{
        active: step === active,
        disabled: (steps.indexOf(active) + 1 < stepIndex) ||
          (step === 'delivery') && !items?.length ||
          (step === 'payment') && selectedDeliverySystem?.checkout?.pendingAddressForPrice,
      }"
    >
      <TheLink
        :to="$page({name: 'checkout/' + (route[step] || step)})"
        class="i-circled i-bordered i-alt divcenter"
      >{{ stepIndex + 1 }}</TheLink>
      <h5>{{ $trans('checkout.' + (i18n[step] || step) + '_step_title') }}</h5>
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'active',
  ],
  data: () => ({
    steps: ['items', 'delivery', 'payment'],
    route: {items: 'cart'},
    i18n: {items: 'goods'},
  }),
  computed: {
    ...mapState('cart', ['items']),
    ...mapState('checkout', ['selectedDeliverySystem']),
  },
}
</script>
