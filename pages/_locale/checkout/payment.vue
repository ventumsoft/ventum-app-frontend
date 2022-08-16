<template>
  <CheckoutStepPayment />
</template>

<script>
export default {
  meta: {
    step: 'payment',
  },
  head() {
    return {
      script: [
        {
          src: 'https://js.stripe.com/v3/',
          body: true,
        },
      ],
    };
  },
  middleware: [
    'authenticate',
    async function ({from, store, redirect, $page}) {
      if (from?.name === 'checkout/delivery') {
        if (!await store.dispatch('checkout/delivery/saveDeliveryData')) {
          redirect($page({name: 'checkout/delivery'}));
          return;
        }
      }
      await store.dispatch('cart/fetch', {checkout: true});
      if (!store.state.cart.items?.length) {
        redirect($page({name: 'checkout/cart'}));
        return;
      }
      if (from?.name !== 'checkout/delivery') {
        await store.dispatch('checkout/delivery/fetchDeliveryStepData');
      }
      await store.dispatch('checkout/payment/fetchPaymentStepData');
    },
  ],
}
</script>
