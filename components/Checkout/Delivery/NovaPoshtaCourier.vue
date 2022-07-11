<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryDataRecipientType v-if="void 'enabledRecipientType'" />
    <CheckoutDeliveryDataName :onlyCyrillic="true" />
    <CheckoutDeliveryDataMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryDataSecondName :onlyCyrillic="true" />
    <CheckoutDeliveryDataCompanyName v-if="(void 'enabledRecipientType') && ('business' === void 'recipient_type')" />
    <CheckoutDeliveryDataEdrpou v-if="(void 'enabledRecipientType') && ('business' === void 'recipient_type')" />
    <div class="col_full address" :class="{'has-error': false}">
      <label>{{ $trans('checkout.delivery_step.form_city') }}:</label>
      <select name="delivery-form-city" class="form-control select2 select-delivery-city" required>
        <option v-if="void 'city'" :value="city">{{ city.Description || city.Present || '' }}</option>
      </select>
    </div>
    <div class="col_full address" :class="{'has-error': false}">
      <label for="delivery-form-street">{{ $trans('checkout.delivery_step.form_street') }}</label>
      <select
        name="delivery-form-street"
        class="form-control select2 select-delivery-street"
        required
      >
        <option v-if="void 'street'" :value="street">{{ street.StreetsType + ' ' + street.Description }}</option>
      </select>
    </div>
    <div class="clear"></div>
    <CheckoutDeliveryDataBuilding />
    <CheckoutDeliveryDataFlat :novaPoshtaFlatValidation="false" />
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
