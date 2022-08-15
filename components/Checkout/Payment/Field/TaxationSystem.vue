<template>
  <div
    class="col_full"
    :class="{'has-error': errors?.taxation_system_id}"
  >
    <label>{{ $trans('checkout.payment_step.cash_on_delivery.fields.taxation_system') }}</label>
    <Select2
      class="form-control"
      @input="$store.commit('checkout/payment/paymentData', {taxation_system_id: Number($event) || null})"
    >
      <option value="">{{ $trans('checkout.payment_step.cash_on_delivery.empty.taxation_system') }}</option>
      <option
        v-for="taxationSystem of taxationSystems"
        :value="taxationSystem.id"
        :selected="taxationSystem.id == paymentData?.taxation_system_id"
      >{{ taxationSystem.name }}</option>
    </Select2>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('checkout/payment', [
      'taxationSystems',
      'paymentData',
      'errors',
    ])
  },
  //mounted() {
  //  if (!this.paymentData?.taxation_system_id && this.taxationSystems?.length) {
  //    this.$store.commit('checkout/payment/paymentData', {taxation_system_id: this.taxationSystems[0].id});
  //  }
  //},
}
</script>
