<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryFieldName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldSecondName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldEvropochtaStreet />
    <div class="clear"></div>
    <CheckoutDeliveryFieldBuilding />
    <CheckoutDeliveryFieldFlat />
    <div class="clear"></div>
    <CheckoutDeliveryFieldEmail />
    <CheckoutDeliveryFieldPhone />
    <div class="clear"></div>
    <CheckoutDeliveryFieldMessage />
  </form>
</template>
