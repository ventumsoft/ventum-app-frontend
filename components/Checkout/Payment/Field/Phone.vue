<template>
  <div class="col_full">
    <label for="payment-form-phone">{{ $trans('checkout.payment_step.cash_on_delivery.phone') }}</label>
    <input
      id="payment-form-phone"
      type="text"
      class="form-control"
      :class="{error: $store.state.checkout.payment.errors?.phone}"
      :data-payment-data-field="'phone'"
      :value="$store.state.checkout.payment.paymentData?.phone"
      @input="$store.commit('checkout/payment/paymentData', {phone: $event.target.value})"
      v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : null"
    >
  </div>
</template>
