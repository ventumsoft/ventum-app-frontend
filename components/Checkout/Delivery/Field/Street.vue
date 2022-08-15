<template>
  <div class="col_full address" :class="{'has-error': $store.state.checkout.delivery.errors?.street}">
    <label>{{ $trans('checkout.delivery_step.form_street') }}</label>
    <Select2
      class="form-control select2 select-delivery-street"
      required
      :options="{ajax: select2Ajax, ...select2Options}"
      @input="$store.commit('checkout/delivery/deliveryData', {street: $event}); $store.dispatch('checkout/delivery/fetchDeliveryStepData', {forPriceUpdate: true, withoutDeliveryData: true});"
    >
      <option
        v-if="deliveryData.street && streetData"
        :value="deliveryData.street"
      >{{ titleFormatter(streetData) }}</option>
    </Select2>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: {
    select2Options: {type: Object},
    titleFormatter: {type: Function, required: true},
  },
  computed: {
    ...mapState('checkout/delivery', [
      'selectedDeliverySystem',
      'deliveryData',
    ]),
    streetData() {
      return JSON.parse(this.deliveryData?.street);
    },
    select2Ajax() {
      return {
        delay: 200,
        method: 'POST',
        url: 'delivery/streets',
        placeholder: 'Search street',
        data: params => ({
          delivery_system_id: this.selectedDeliverySystem.id,
          city: this.deliveryData?.city,
          search: params.term,
        }),
      };
    },
  },
}
</script>
