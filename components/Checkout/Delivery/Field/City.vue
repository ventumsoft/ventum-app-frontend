<template>
  <div class="col_full address" :class="{'has-error': false}">
    <label>{{ $trans('checkout.delivery_step.form_city') }}:</label>
    <Select2
      class="form-control select2 select-delivery-city"
      required
      :options="{ajax: select2Ajax, ...select2Options}"
      @input="$store.commit('checkout/deliveryData', {city: $event, warehouse: null, street: null}); $store.dispatch('checkout/fetchDeliveryStepData', {forPriceUpdate: true});"
    >
      <option
        v-if="deliveryData.city && cityData"
        :value="deliveryData.city"
      >{{ titleFormatter(cityData) }}</option>
    </Select2>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: {
    select2Options: {type: Object},
    titleFormatter: {type: Function, required: true},
  },
  computed: {
    ...mapState('checkout', ['selectedDeliverySystem', 'deliveryData']),
    cityData() {
      return JSON.parse(this.deliveryData?.city);
    },
    select2Ajax() {
      return {
        delay: 200,
        method: 'POST',
        url: 'checkout/delivery/cities',
        placeholder: 'Search City',
        data: params => ({
          delivery_system_id: this.selectedDeliverySystem.id,
          search: params.term,
        }),
      };
    },
  },
}
</script>
