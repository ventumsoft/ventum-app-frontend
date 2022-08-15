<template>
  <div class="col_full address">
    <label for="delivery-form-address">{{ $trans('checkout.delivery_step.form_address') }}:</label>
    <input
      type="text"
      id="delivery-form-address"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.address}"
      :value="$store.state.checkout.delivery.deliveryData?.address"
      @input="$store.commit('checkout/delivery/deliveryData', {address: $event.target.value})"
      required
    />
  </div>
</template>
