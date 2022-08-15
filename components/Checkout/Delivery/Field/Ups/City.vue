<template>
  <CheckoutDeliveryFieldCity
    class="col_two_fifth"
    :customCol="true"
    :customLabel="$trans('checkout.delivery_step.form_city_ups')"
    :select2Options="{
      minimumInputLength: 2,
      i18nMessageInputTooShort: $trans('checkout.delivery_step.select2_message.input_too_short'),
      tags: true,
    }"
    :select2AjaxParams="() => ({state: $store.state.checkout.delivery.deliveryData?.state})"
    :titleFormatter="city => city"
    :lookupOnChange="true"
  />
</template>
