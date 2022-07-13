<template>
  <div class="col_full">
    <label for="delivery-form-second-name">{{ $trans('checkout.delivery_step.form_second_name*') }}</label>
    <input
      type="text"
      id="delivery-form-second-name"
      class="form-control"
      :class="{error: $store.state.checkout.deliveryErrors?.second_name}"
      :value="$store.state.checkout.deliveryData?.second_name"
      @input="$store.commit('checkout/deliveryData', {second_name: $event.target.value})"
      required
    />
    <span v-if="onlyCyrillic" class="help-block">{{ $trans('checkout.delivery_step.validation_second_name_') }}</span>
  </div>
</template>

<script>
export default {
  props: ['onlyCyrillic'],
}
</script>
