<template>
  <CartStepItems />
</template>

<script>
export default {
  meta: {
    step: 'items',
  },
  async middleware({store}) {
    console.log('checkout/cart middleware');
    await store.dispatch('cart/fetch', {summary: true});
  },
}
</script>
