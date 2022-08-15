<template>
  <div class="col_full">
    <label :for="'payment-form-' + field">{{ title || $trans('checkout.payment_step.cash_on_delivery.fields.' + field) }}</label>
    <input
      :id="'payment-form-' + field"
      type="text"
      class="form-control"
      :class="{error: Boolean(errors?.[field])}"
      :value="paymentData?.[field] || ''"
      @input="$store.commit('checkout/payment/paymentData', {[field]: $event.target.value})"
    >
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: ['field', 'title'],
  computed: {
    ...mapState('checkout/payment', [
      'paymentData',
      'errors',
    ]),
  },
}
</script>
