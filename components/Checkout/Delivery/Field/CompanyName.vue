<template>
  <div
    v-if="selectedDeliverySystem.isEnabledRecipientType && ($store.state.checkout.deliveryData?.recipient_type === 'business')"
    class="col_full"
  >
    <label>{{ $trans('checkout.delivery_step.form_company_name') }}</label>
    <input
      type="text"
      class="form-control"
      :class="{error: false}"
      :value="$store.state.checkout.deliveryData?.company_name"
      @input="$store.commit('checkout/deliveryData', {company_name: $event.target.value})"
    >
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('checkout', ['selectedDeliverySystem']),
  },
}
</script>
