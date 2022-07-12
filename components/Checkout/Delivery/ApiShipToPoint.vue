<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryFieldName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldSecondName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldApiShipCity />
    <CheckoutDeliveryFieldApiShipWarehouse />
    <div class="clear"></div>
    <CheckoutDeliveryFieldEmail />
    <CheckoutDeliveryFieldPhone />
    <div class="clear"></div>
    <CheckoutDeliveryFieldMessage />
  </form>
</template>
