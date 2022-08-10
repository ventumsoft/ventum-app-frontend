<template>
  <div class="col_full">
    <label for="delivery-form-address-line-2">{{ $trans('checkout.delivery_step.form_address_line_2') }}:</label>
    <input
      type="text"
      class="form-control"
      id="delivery-form-address-line-2"
      :class="{error: $store.state.checkout.deliveryErrors?.address_line_2}"
      :value="$store.state.checkout.deliveryData?.address_line_2"
      @input="$store.commit('checkout/deliveryData', {address_line_2: $event.target.value})"
    >
  </div>
</template>
