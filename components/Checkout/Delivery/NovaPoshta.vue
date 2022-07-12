<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryFieldRecipientType />
    <CheckoutDeliveryFieldName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldSecondName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldCompanyName />
    <CheckoutDeliveryFieldEdrpou />
    <CheckoutDeliveryFieldNovaPoshtaCity />
    <CheckoutDeliveryFieldNovaPoshtaWarehouse />
    <div class="clear"></div>
    <CheckoutDeliveryFieldEmail />
    <CheckoutDeliveryFieldPhone />
    <div class="clear"></div>
    <CheckoutDeliveryFieldMessage />
  </form>
</template>
