<template>
  <div class="col_full">
    <label for="delivery-form-address-line-1">{{ $trans('checkout.delivery_step.form_address_line_1') }}:</label>
    <input
      type="text"
      class="form-control"
      id="delivery-form-address-line-1"
      :class="{error: $store.state.checkout.deliveryErrors?.address_line_1}"
      :value="$store.state.checkout.deliveryData?.address_line_1"
      @input="$store.commit('checkout/deliveryData', {address_line_1: $event.target.value})"
    >
  </div>
</template>
