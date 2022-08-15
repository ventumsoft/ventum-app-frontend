<template>
  <div :class="{col_full: !customCol}">
    <label for="delivery-form-name">{{ $trans('checkout.delivery_step.form_first_name') }}</label>
    <input
      type="text"
      id="delivery-form-name"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.name}"
      :value="$store.state.checkout.delivery.deliveryData?.name"
      @input="$store.commit('checkout/delivery/deliveryData', {name: $event.target.value})"
      required
    />
    <span v-if="onlyCyrillic" class="help-block">{{ $trans('checkout.delivery_step.validation_first_name_') }}</span>
  </div>
</template>

<script>
export default {
  props: ['customCol', 'onlyCyrillic'],
}
</script>
