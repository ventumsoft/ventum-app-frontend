<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryDataName />
    <CheckoutDeliveryDataMiddleName />
    <div class="clear"></div>
    <CheckoutDeliveryDataCountry v-if="$store.state.site.settings?.['general:multicountry']" />
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
