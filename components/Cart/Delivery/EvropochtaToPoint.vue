<template>
  <form class="nobottommargin" @submit.prevent>
    <div class="col_full">
      <label for="delivery-form-name">{{ $trans('checkout.delivery_step.form_first_name') }}</label>
      <input type="text" id="delivery-form-name" name="delivery-form-name" class="form-control" :class="{error: false}" required/>
      <span class="help-block">{{ $trans('checkout.delivery_step.validation_first_name_') }}</span>
    </div>
    <div class="col_full">
      <label for="delivery-form-middle-name">{{ $trans('checkout.delivery_step.form_middle_name*') }}</label>
      <input type="text" id="delivery-form-middle-name" name="delivery-form-middle-name" class="form-control" :class="{error: false}" required/>
      <span class="help-block">{{ $trans('checkout.delivery_step.validation_middle_name_') }}</span>
    </div>
    <div class="col_full">
      <label for="delivery-form-second-name">{{ $trans('checkout.delivery_step.form_second_name*') }}</label>
      <input type="text" id="delivery-form-second-name" name="delivery-form-second-name" class="form-control" :class="{error: false}" required/>
      <span class="help-block">{{ $trans('checkout.delivery_step.validation_second_name_') }}</span>
    </div>
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
    <div class="col_half">
      <label for="delivery-form-email">{{ $trans('checkout.delivery_step.form_email') }}:</label>
      <input type="email" id="delivery-form-email" name="delivery-form-email" class="form-control" :class="{error: false}" required/>
    </div>
    <div class="col_half col_last">
      <label for="delivery-form-phone">{{ $trans('checkout.delivery_step.form_phone') }}</label>
      <input type="text" id="delivery-form-phone" name="delivery-form-phone" class="form-control" :class="{error: false}" required v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : ''" />
    </div>
    <div class="clear"></div>
    <div class="col_full">
      <label for="delivery-form-message">{{ $trans('checkout.delivery_step.form_message') }}</label>
      <textarea class="form-control" :class="{error: false}" id="delivery-form-message" name="delivery-form-message" rows="6" cols="30"></textarea>
    </div>
  </form>
</template>

<script>
export default {
  props: [
    'deliveryMethod',
  ],
}
</script>
