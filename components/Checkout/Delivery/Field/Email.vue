<template>
  <div class="col_half">
    <label for="delivery-form-email">{{ $trans('checkout.delivery_step.form_email') }}:</label>
    <input
      type="email"
      id="delivery-form-email"
      class="form-control"
      :class="{error: false}"
      :value="$store.state.checkout.deliveryData?.email"
      @input="$store.commit('checkout/deliveryData', {email: $event.target.value})"
      required
    />
  </div>
</template>
