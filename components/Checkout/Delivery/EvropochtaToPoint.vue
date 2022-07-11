<template>
  <form class="nobottommargin" @submit.prevent>
    <CheckoutDeliveryDataName :onlyCyrillic="true" />
    <CheckoutDeliveryDataMiddleName :onlyCyrillic="true" />
    <CheckoutDeliveryDataSecondName :onlyCyrillic="true" />
    <div class="col_full address" :class="{'has-error': false}">
      <label for="delivery-form-warehouse">{{ $trans('checkout.delivery_step.form_warehouse') }}</label>
      <select
        name="delivery-form-warehouse"
        class="form-control select2 select-delivery-warehouse"
        required
      >
        <option v-if="void 'warehouse'" :value="warehouse">{{ warehouse.WarehouseName }}</option>
      </select>
    </div>
    <div class="clear"></div>
    <CheckoutDeliveryDataPhone />
    <CheckoutDeliveryDataEmail />
    <div class="clear"></div>
    <CheckoutDeliveryDataMessage />
  </form>
</template>

<script>
export default {
  props: [
    'deliveryMethod',
  ],
}
</script>
