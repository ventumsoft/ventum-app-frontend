<template>
  <CheckoutStepCart />
</template>

<script>
export default {
  meta: {
    step: 'items',
  },
  async middleware({store}) {
    await store.dispatch('cart/fetch', {checkout: true});
  },
  head() {
    return {
      script: [
        this.$store.state.site.settings?.['seo-integration:gads-dynamic-remarketing:enabled'] && {body: true, innerHTML: `
          window.dataLayer = window.dataLayer || [];
          dataLayer.push(${JSON.stringify({
            event: 'add_to_cart',
            value: this.$store.state.cart.totalWithDiscountValue,
            items: this.$store.state.cart.items.map(cartItem => ({
              id: cartItem.productId + '-' + this.$store.state.site.language.id,
              google_business_vertical: 'retail',
            })),
          })});
        `},
      ].filter(v => v),
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
}
</script>
