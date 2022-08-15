<template>
  <div
    v-if="selectedDeliverySystem.isEnabledRecipientType"
    class="col_full"
    :class="{'has-error': $store.state.checkout.delivery.errors?.recipient_type}"
  >
    <label>{{ $trans('checkout.delivery_step.form_recipient_type') }}</label>
    <Select2
      class="form-control select-delivery-recipient-type"
      @input="$store.commit('checkout/delivery/deliveryData', {recipient_type: $event})"
      required
    >
      <option
        v-for="deliveryUserType of ['private', 'business']"
        :value="deliveryUserType"
        :selected="deliveryUserType === ($store.state.checkout.delivery.deliveryData?.recipient_type || 'private')"
      >{{ $trans('checkout.delivery_step.form_recipient_type.' + deliveryUserType) }}</option>
    </Select2>
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
