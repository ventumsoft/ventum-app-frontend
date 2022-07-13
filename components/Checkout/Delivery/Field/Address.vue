<template>
  <div class="col_full address">
    <label for="delivery-form-address">{{ $trans('checkout.delivery_step.form_address') }}:</label>
    <input
      type="text"
      id="delivery-form-address"
      class="form-control"
      :class="{error: $store.state.checkout.deliveryErrors?.address}"
      :value="$store.state.checkout.deliveryData?.address"
      @input="$store.commit('checkout/deliveryData', {address: $event.target.value})"
      required
    />
  </div>
</template>
