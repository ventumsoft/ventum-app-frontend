<template>
  <div class="col_full">
    <label :for="'payment-form-' + field">{{ title || $trans('checkout.payment_step.cash_on_delivery.' + field) }}</label>
    <input
      :id="'payment-form-' + field"
      type="text"
      class="form-control"
      :class="{error: Boolean(errors?.[field])}"
      :data-payment-data-field="field"
      v-model="paymentData[field]"
    >
  </div>
</template>

<script>
export default {
  props: ['field', 'title', 'paymentData', 'errors'],
}
</script>
