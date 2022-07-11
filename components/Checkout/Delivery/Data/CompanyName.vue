<template>
  <div class="col_full">
    <label>{{ $trans('checkout.delivery_step.form_company_name') }}</label>
    <input
      type="text"
      class="form-control"
      :class="{error: false}"
      :value="$store.state.checkout.deliveryData?.company_name"
      @input="$store.commit('checkout/deliveryData', {company_name: $event.target.value})"
    >
  </div>
</template>
