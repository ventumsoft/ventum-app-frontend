<template>
  <div class="col_full">
    <label for="delivery-form-name">{{ $trans('checkout.delivery_step.form_first_name') }}</label>
    <input
      type="text"
      id="delivery-form-name"
      class="form-control"
      :class="{error: $store.state.checkout.deliveryErrors?.name}"
      :value="$store.state.checkout.deliveryData?.name"
      @input="$store.commit('checkout/deliveryData', {name: $event.target.value})"
      required
    />
    <span v-if="onlyCyrillic" class="help-block">{{ $trans('checkout.delivery_step.validation_first_name_') }}</span>
  </div>
</template>

<script>
export default {
  props: ['onlyCyrillic'],
}
</script>
