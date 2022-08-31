<template>
  <div
    v-if="$store.state.site.settings?.['general:multicountry']"
    class="col_full"
    :class="{'has-error': Boolean(errors?.[field || 'country_id'])}"
  >
    <label>{{ $trans('checkout.payment_step.cash_on_delivery.country') }}</label>
    <Select2
      class="form-control"
      :data-payment-data-field="field || 'country_id'"
      @input="paymentData[field || 'country_id'] = Number($event) || ''"
    >
      <option
        v-for="country of countries"
        :value="country.id"
        :selected="country.id == paymentData[field || 'country_id']"
      >{{ country.name }}</option>
    </Select2>
  </div>
</template>

<script>
export default {
  props: ['paymentData', 'errors', 'field'],
  data: () => ({
    countries: [],
  }),
  async mounted() {
    ({data: this.countries} = await this.$axios.post('geo/countries'));
  },
}
</script>
