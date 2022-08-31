<template>
  <CheckoutStepPayment
    v-bind="{
      paymentSystems,
      paymentRoutes,
      userTypesFields,
      taxationSystems,
      paymentData,
    }"
  />
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
    },
  ],
  async asyncData({$axios}) {
    const {data: userTypesFields} = await $axios.get('checkout/payment/user-types-fields');
    const {data: taxationSystems} = await $axios.get('checkout/payment/taxation-systems');
    const {data: {paymentSystems, paymentRoutes}} = await $axios.get('checkout/payment/systems-and-routes');
    const {data: paymentData} = await $axios.get('checkout/payment/data');
    return {
      paymentSystems,
      paymentRoutes,
      userTypesFields,
      taxationSystems,
      paymentData: paymentData || {},
    };
  },
}
</script>
