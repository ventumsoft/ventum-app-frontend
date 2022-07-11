<template>
  <CheckoutStepPayment />
</template>

<script>
export default {
  meta: {
    step: 'payment',
  },
  middleware: ['authenticate'],
}
</script>
