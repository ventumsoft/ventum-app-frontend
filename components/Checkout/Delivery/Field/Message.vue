<template>
  <div class="col_full">
    <label for="delivery-form-message">{{ $trans('checkout.delivery_step.form_message') }}</label>
    <textarea
      class="form-control"
      :class="{error: $store.state.checkout.deliveryErrors?.message}"
      id="delivery-form-message"
      rows="6"
      cols="30"
      :value="$store.state.checkout.deliveryData?.message"
      @input="$store.commit('checkout/deliveryData', {message: $event.target.value})"
    ></textarea>
  </div>
</template>
