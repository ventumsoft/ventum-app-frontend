<template>
  <div class="col_full address" :class="{'has-error': $store.state.checkout.delivery.errors?.warehouse}">
    <label>{{ $trans('checkout.delivery_step.form_warehouse') }}</label>
    <Select2
      class="form-control select2 select-delivery-warehouse"
      required
      :options="{ajax: select2Ajax, ...select2Options}"
      @input="$store.commit('checkout/delivery/deliveryData', {warehouse: $event}); $store.dispatch('checkout/delivery/fetchDeliveryStepData', {forPriceUpdate: true, withoutDeliveryData: true});"
    >
      <option
        v-if="deliveryData.warehouse && warehouseData"
        :value="deliveryData.warehouse"
      >{{ titleFormatter(warehouseData) }}</option>
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
    warehouseData() {
      return JSON.parse(this.deliveryData?.warehouse);
    },
    select2Ajax() {
      return {
        delay: 200,
        method: 'POST',
        url: 'delivery/warehouses',
        placeholder: 'Search Warehouse',
        data: params => ({
          delivery_system_id: this.selectedDeliverySystem.id,
          dimensions: this.selectedDeliverySystem.checkout.dimensions,
          weight: this.selectedDeliverySystem.checkout.weightForWarehouses,
          city: this.deliveryData?.city,
          search: params.term,
        }),
      };
    },
  },
}
</script>
