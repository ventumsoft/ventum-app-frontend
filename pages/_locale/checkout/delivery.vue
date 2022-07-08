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
      await store.dispatch('cart/fetch', {checkout: true, delivery: true});
    },
  ],
}
</script>
