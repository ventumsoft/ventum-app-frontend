<template>
  <div class="col_half">
    <label for="delivery-form-building">{{ $trans('checkout.delivery_step.form_building') }}</label>
    <input
      type="text"
      id="delivery-form-building"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.building}"
      :value="$store.state.checkout.delivery.deliveryData?.building"
      @input="$store.commit('checkout/delivery/deliveryData', {building: $event.target.value})"
      required
    />
  </div>
</template>
