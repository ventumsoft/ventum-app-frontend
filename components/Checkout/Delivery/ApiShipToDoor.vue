<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryDataName :onlyCyrillic="true" />
    <CheckoutDeliveryDataMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryDataSecondName :onlyCyrillic="true" />
    <div class="col_full address" :class="{'has-error': false}">
      <label for="delivery-form-city">{{ $trans('checkout.delivery_step.form_city') }}:</label>
      <select
        name="delivery-form-city"
        class="form-control select2 select-delivery-city"
        required
        data-minimum-input-length="3"
        :data-i18n-message-input-too-short="$trans('checkout.delivery_step.select2_message.input_too_short')"
      >
        <option v-if="void 'city'" :value="city">{{ city.cityType + '. ' + city.city + ' (' + city.region + ')' }}</option>
      </select>
    </div>
    <div class="col_full address" :class="{'has-error': false}">
      <label for="delivery-form-street">{{ $trans('checkout.delivery_step.form_street') }}</label>
      <select
        name="delivery-form-street"
        class="form-control select2 select-delivery-street"
        required
        data-minimum-input-length="3"
        :data-i18n-message-input-too-short="$trans('checkout.delivery_step.select2_message.input_too_short')"
      >
        <option v-if="void 'street'" :value="street">{{ street.streetType + '. ' + street.street }}</option>
      </select>
    </div>
    <div class="clear"></div>
    <CheckoutDeliveryDataBuilding />
    <CheckoutDeliveryDataFlat />
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
