<template>
  <div class="col_full" :class="{'has-error': false}">
    <label>{{ $trans('checkout.delivery_step.form_recipient_type') }}</label>
    <select
      class="form-control select-delivery-recipient-type"
      required
    >
      <option
        v-for="deliveryUserType of ['private', 'business']"
        :value="deliveryUserType"
        :selected="deliveryUserType === ($store.state.checkout.deliveryData?.recipient_type || 'private')"
      >{{ $trans('checkout.delivery_step.form_recipient_type.' + deliveryUserType) }}</option>
    </select>
  </div>
</template>
