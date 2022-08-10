<template>
  <div
    class="address"
    :class="{col_full: !customCol, 'has-error': $store.state.checkout.deliveryErrors?.city}"
  >
    <label>{{ customLabel || $trans('checkout.delivery_step.form_city') }}:</label>
    <Select2
      class="form-control select2 select-delivery-city"
      required
      :options="{ajax: select2Ajax, ...select2Options}"
      @input="handleChange"
    >
      <option
        v-if="deliveryData.city"
        :key="deliveryData.city"
        :value="deliveryData.city"
        selected
      >{{ cityData && titleFormatter(cityData) || deliveryData.city }}</option>
    </Select2>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: {
    customCol: {type: Boolean},
    customLabel: {type: String},
    select2Options: {type: Object},
    select2AjaxParams: {type: Function},
    titleFormatter: {type: Function, required: true},
    lookupOnChange: {type: Boolean},
  },
  computed: {
    ...mapState('checkout', ['selectedDeliverySystem', 'deliveryData']),
    cityData() {
      try {
        return JSON.parse(this.deliveryData?.city);
      } catch (exception) {
        //
      }
      return null;
    },
    select2Ajax() {
      return {
        delay: 200,
        method: 'POST',
        url: 'delivery/cities',
        placeholder: 'Search City',
        data: params => ({
          delivery_system_id: this.selectedDeliverySystem.id,
          ...((this.select2AjaxParams instanceof Function) && this.select2AjaxParams() || undefined),
          search: params.term,
        }),
      };
    },
  },
  methods: {
    async handleChange(city) {
      this.$store.commit('checkout/deliveryData', {city, warehouse: null, street: null});
      if (this.lookupOnChange) {
        const {data: {zip}} = await this.$axios.post('delivery/city', {
          delivery_system_id: this.selectedDeliverySystem.id,
          city,
          state: this.deliveryData?.state,
        }, {
          progress: false,
          silenceException: true,
        });
        if (zip) {
          this.$store.commit('checkout/deliveryData', {zip});
        }
      }
      this.$store.dispatch('checkout/fetchDeliveryStepData', {forPriceUpdate: true, withoutDeliveryData: true});
    },
  },
}
</script>
