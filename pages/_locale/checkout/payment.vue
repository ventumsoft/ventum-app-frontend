<template>
  <CheckoutStepPayment />
</template>

<script>
export default {
  meta: {
    step: 'payment',
  },
  middleware: [
    'authenticate',
    async function ({from, store, redirect, $page}) {
      if (from?.name === 'checkout/delivery') {
        if (!await store.dispatch('checkout/saveDeliveryData')) {
          redirect($page({name: 'checkout/delivery'}));
          return;
        }
      }
      await store.dispatch('cart/fetch', {checkout: true});
      if (!store.state.cart.items?.length) {
        redirect($page({name: 'checkout/cart'}));
        return;
      }
      await store.dispatch('checkout/fetchDeliveryStepData');
    },
  ],
}
</script>
