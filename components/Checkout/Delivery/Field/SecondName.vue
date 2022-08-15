<template>
  <div :class="{col_full: !customCol}">
    <label for="delivery-form-second-name">{{ $trans('checkout.delivery_step.form_second_name*') }}</label>
    <input
      type="text"
      id="delivery-form-second-name"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.second_name}"
      :value="$store.state.checkout.delivery.deliveryData?.second_name"
      @input="$store.commit('checkout/delivery/deliveryData', {second_name: $event.target.value})"
      required
    />
    <span v-if="onlyCyrillic" class="help-block">{{ $trans('checkout.delivery_step.validation_second_name_') }}</span>
  </div>
</template>

<script>
export default {
  props: ['customCol', 'onlyCyrillic'],
}
</script>
