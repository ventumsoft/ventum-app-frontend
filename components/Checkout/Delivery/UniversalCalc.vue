<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryDataName />
    <CheckoutDeliveryDataMiddleName />
    <CheckoutDeliveryDataCountry v-if="$store.state.site.settings?.['general:multicountry']" />
    <CheckoutDeliveryDataAddress />
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
