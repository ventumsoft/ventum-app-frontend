<template>
  <div class="col_half">
    <label for="delivery-form-email">{{ $trans('checkout.delivery_step.form_email') }}:</label>
    <input
      type="email"
      id="delivery-form-email"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.email}"
      :value="$store.state.checkout.delivery.deliveryData?.email"
      @input="$store.commit('checkout/delivery/deliveryData', {email: $event.target.value})"
      required
    />
  </div>
</template>
