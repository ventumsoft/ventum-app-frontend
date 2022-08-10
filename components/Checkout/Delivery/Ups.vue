<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryFieldName class="col_half" :customCol="true" />
    <CheckoutDeliveryFieldSecondName class="col_half col_last" :customCol="true" />
    <div class="clear"></div>
    <CheckoutDeliveryFieldAddressLine1 />
    <CheckoutDeliveryFieldAddressLine2 />
    <div class="clear"></div>
    <CheckoutDeliveryFieldUpsZip />
    <CheckoutDeliveryFieldUpsCity />
    <CheckoutDeliveryFieldUpsState />
    <div class="clear"></div>
    <CheckoutDeliveryFieldEmail />
    <CheckoutDeliveryFieldPhone />
    <div class="clear"></div>
    <CheckoutDeliveryFieldMessage />
  </form>
</template>
