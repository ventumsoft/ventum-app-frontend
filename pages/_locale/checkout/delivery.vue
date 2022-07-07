<template>
  <CartStepDelivery />
</template>

<script>
export default {
  meta: {
    step: 'delivery',
  },
  middleware: [
    'authenticate',
    async function ({store}) {
      console.log('checkout/delivery middleware');
      await store.dispatch('cart/fetch', {summary: true, delivery: true});
    },
  ],
}
</script>
