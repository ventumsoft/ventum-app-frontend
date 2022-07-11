<template>
  <div class="col_full">
    <label>{{ $trans('checkout.delivery_step.form_edrpou') }}</label>
    <input
      type="text"
      class="form-control"
      :class="{error: false}"
      :value="$store.state.checkout.deliveryData?.edrpou"
      @input="$store.commit('checkout/deliveryData', {edrpou: $event.target.value})"
    >
  </div>
</template>
