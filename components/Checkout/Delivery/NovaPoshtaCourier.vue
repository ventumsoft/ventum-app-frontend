<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryFieldRecipientType />
    <CheckoutDeliveryFieldName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldSecondName :onlyCyrillic="true" />
    <CheckoutDeliveryFieldCompanyName />
    <CheckoutDeliveryFieldEdrpou />
    <CheckoutDeliveryFieldNovaPoshtaCity />
    <CheckoutDeliveryFieldNovaPoshtaStreet />
    <div class="clear"></div>
    <CheckoutDeliveryFieldBuilding />
    <CheckoutDeliveryFieldFlat :novaPoshtaFlatValidation="false" />
    <CheckoutDeliveryFieldEmail />
    <CheckoutDeliveryFieldPhone />
    <div class="clear"></div>
    <CheckoutDeliveryFieldMessage />
  </form>
</template>
