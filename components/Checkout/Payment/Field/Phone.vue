<template>
  <div class="col_full">
    <label for="payment-form-phone">{{ $trans('checkout.payment_step.phone') }}</label>
    <input
      id="payment-form-phone"
      type="text"
      class="form-control"
      :class="{error: Boolean(errors?.phone)}"
      :placeholder="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask']?.replace(/#/g, '_') : ''"
      data-payment-data-field="phone"
      v-model="paymentData.phone"
      v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : null"
    >
  </div>
</template>

<script>
export default {
  props: ['paymentData', 'errors'],
}
</script>
