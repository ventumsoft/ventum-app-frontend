<template>
  <div
    v-if="$store.state.site.settings?.['general:multicountry']"
    class="col_full"
    :class="{'has-error': $store.state.checkout.deliveryErrors?.country_id}"
  >
    <label>{{ $trans('checkout.delivery_step.form_country') }}:</label>
    <Select2
      class="form-control"
      @input="$store.commit('checkout/deliveryData', {country_id: $event})"
    >
      <option
        v-for="country of countries"
        :value="country.id"
        :selected="country.id == $store.state.checkout.deliveryData?.country_id"
      >{{ country.name }}</option>
    </Select2>
  </div>
</template>

<script>
export default {
  data: () => ({
    countries: [],
  }),
  async mounted() {
    ({data: this.countries} = await this.$axios.post('geo/countries'));
  },
}
</script>
