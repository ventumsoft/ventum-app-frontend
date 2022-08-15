<template>
  <div
    v-if="selectedDeliverySystem.isEnabledRecipientType && ($store.state.checkout.delivery.deliveryData?.recipient_type === 'business')"
    class="col_full"
  >
    <label>{{ $trans('checkout.delivery_step.form_company_name') }}</label>
    <input
      type="text"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.company_name}"
      :value="$store.state.checkout.delivery.deliveryData?.company_name"
      @input="$store.commit('checkout/delivery/deliveryData', {company_name: $event.target.value})"
    >
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('checkout/delivery', ['selectedDeliverySystem']),
  },
}
</script>
