<template>
  <div class="col_full">
    <label for="delivery-form-middle-name">{{ $trans('checkout.delivery_step.form_middle_name*') }}</label>
    <input
      type="text"
      id="delivery-form-middle-name"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.middle_name}"
      :value="$store.state.checkout.delivery.deliveryData?.middle_name"
      @input="$store.commit('checkout/delivery/deliveryData', {middle_name: $event.target.value})"
      required
    />
    <span v-if="onlyCyrillic" class="help-block">{{ $trans('checkout.delivery_step.validation_middle_name_') }}</span>
  </div>
</template>

<script>
export default {
  props: ['onlyCyrillic'],
}
</script>
