<template>
  <div class="col_full">
    <label for="delivery-form-message">{{ $trans('checkout.delivery_step.form_message') }}</label>
    <textarea
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.message}"
      id="delivery-form-message"
      rows="6"
      cols="30"
      :value="$store.state.checkout.delivery.deliveryData?.message"
      @input="$store.commit('checkout/delivery/deliveryData', {message: $event.target.value})"
    ></textarea>
  </div>
</template>
