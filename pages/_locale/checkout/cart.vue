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
}
</script>
