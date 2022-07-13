<template>
  <div class="col_half col_last">
    <label for="delivery-form-flat">{{ $trans('checkout.delivery_step.form_flat') }}</label>
    <input
      type="text"
      id="delivery-form-flat"
      class="form-control"
      :class="{error: $store.state.checkout.deliveryErrors?.flat}"
      :value="$store.state.checkout.deliveryData?.flat"
      @input="$store.commit('checkout/deliveryData', {flat: $event.target.value})"
      required
    />
    <span v-if="novaPoshtaFlatValidation" class="help-block">{{ $trans('checkout.delivery_step.nova_poshta_courier.validation.flat') }}</span>
  </div>
</template>

<script>
export default {
  props: ['novaPoshtaFlatValidation'],
}
</script>
