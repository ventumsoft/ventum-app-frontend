<template>
  <CheckoutPaymentFieldCountry
    :field="'company_country_id'"
    v-bind="{paymentData, errors}"
  />
</template>

<script>
export default {
  props: ['paymentData', 'errors'],
}
</script>
