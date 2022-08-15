<template>
  <div :class="{col_half: !customCol}">
    <label for="delivery-form-zip">{{ $trans('checkout.delivery_step.form_zip') }}:</label>
    <input
      type="text"
      id="delivery-form-zip"
      class="form-control delivery-zip-input"
      :class="{error: $store.state.checkout.delivery.errors?.zip, 'has-error': error, 'has-loader': loading}"
      :value="$store.state.checkout.delivery.deliveryData?.zip"
      @input="handleChange($event.target.value)"
      required
    />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import _debounce from 'lodash/debounce';

export default {
  props: ['customCol', 'lookupOnChange'],
  data: () => ({
    loading: false,
    error: false,
  }),
  computed: {
    ...mapState('checkout/delivery', [
      'selectedDeliverySystem',
      'deliveryData',
    ]),
  },
  methods: {
    async handleChange(zip) {
      this.error = false;
      this.$store.commit('checkout/delivery/deliveryData', {zip});
      if (this.lookupOnChange) {
        this.lookupDebounced(zip);
      }
    },
    lookupDebounced: _debounce(async function (zip) {
      if (!(zip?.length > 4)) {
        return;
      }
      let city, state;
      try {
        this.loading = true;
        ({data: {city, state}} = await this.$axios.post('delivery/zip', {
          delivery_system_id: this.selectedDeliverySystem.id,
          zip,
        }, {
          progress: false,
          silenceException: true,
        }));
      } catch (exception) {
        this.error = true;
        return;
      } finally {
        this.loading = false;
      }
      if (city) {
        this.$store.commit('checkout/delivery/deliveryData', {city});
      }
      if (state) {
        this.$store.commit('checkout/delivery/deliveryData', {state});
      }
      this.$store.dispatch('checkout/delivery/fetchDeliveryStepData', {forPriceUpdate: true, withoutDeliveryData: true});
    }, 1000),
  },
}
</script>
