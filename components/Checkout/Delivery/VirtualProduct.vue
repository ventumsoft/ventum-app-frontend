<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryDataName />
    <CheckoutDeliveryDataSecondName />
    <div class="clear"></div>
    <CheckoutDeliveryDataPhone />
    <CheckoutDeliveryDataEmail />
    <div class="clear"></div>
    <CheckoutDeliveryDataMessage />
  </form>
</template>

<script>
export default {
  props: [
    'deliveryMethod',
  ],
}
</script>
