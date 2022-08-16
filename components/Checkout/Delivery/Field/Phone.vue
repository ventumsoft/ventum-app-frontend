<template>
  <div class="col_half col_last">
    <label for="delivery-form-phone">{{ $trans('checkout.delivery_step.form_phone') }}</label>
    <input
      type="text"
      id="delivery-form-phone"
      class="form-control"
      :class="{error: $store.state.checkout.delivery.errors?.phone}"
      :value="$store.state.checkout.delivery.deliveryData?.phone"
      @input="$store.commit('checkout/delivery/deliveryData', {phone: $event.target.value})"
      required
      v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : null"
    />
  </div>
</template>
