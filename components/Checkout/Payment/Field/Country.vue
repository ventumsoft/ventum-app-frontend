<template>
  <div
    v-if="$store.state.site.settings?.['general:multicountry']"
    class="col_full"
    :class="{'has-error': $store.state.checkout.payment.errors?.country_id}"
  >
    <label>{{ $trans('checkout.payment_step.cash_on_delivery.country') }}</label>
    <Select2
      class="form-control"
      @input="$store.commit('checkout/payment/paymentData', {country_id: Number($event) || null})"
    >
      <option
        v-for="country of countries"
        :value="country.id"
        :selected="country.id == $store.state.checkout.payment.paymentData?.country_id"
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
