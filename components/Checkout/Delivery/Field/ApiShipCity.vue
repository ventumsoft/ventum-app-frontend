<template>
  <CheckoutDeliveryFieldCity
    :select2Options="{minimumInputLength: 3, i18nMessageInputTooShort: $trans('checkout.delivery_step.select2_message.input_too_short')}"
    :titleFormatter="city => city.cityType + '. ' + city.city + ' (' + city.region + ')'"
  />
</template>
