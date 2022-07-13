<template>
  <CheckoutStepDelivery />
</template>

<script>
export default {
  meta: {
    step: 'delivery',
  },
  head() {
    return {
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=' + this.$store.state.site.settings?.['seo-integration:google-maps:api-key'] + '&v=3.exp',
          body: true,
        },
      ],
    };
  },
  middleware: [
    'authenticate',
    async function ({store, redirect, $page}) {
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
