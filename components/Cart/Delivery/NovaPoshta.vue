<template>
  <form class="nobottommargin" @submit.prevent>
    <div v-if="void 'enabledRecipientType'" class="col_full" :class="{'has-error': false}">
      <label>{{ $trans('checkout.delivery_step.form_recipient_type') }}</label>
      <select
        class="form-control select-delivery-recipient-type"
        name="delivery-form-recipient-type"
        required
      >
        <option
          v-for="deliveryUserType of ['private', 'business']"
          :value="deliveryUserType"
          :selected="deliveryUserType === null"
          >{{ $trans('checkout.delivery_step.form_recipient_type.' + deliveryUserType) }}</option>
      </select>
    </div>
    <input v-else type="hidden" name="delivery-form-recipient-type" value="private">
    <div class="col_full">
      <label>{{ $trans('checkout.delivery_step.form_first_name') }}</label>
      <input type="text" name="delivery-form-name" class="form-control" :class="{error: false}">
      <span class="help-block">{{ $trans('checkout.delivery_step.validation_first_name_') }}</span>
    </div>
    <div class="col_full">
      <label>{{ $trans('checkout.delivery_step.form_middle_name*') }}</label>
      <input type="text" name="delivery-form-middle-name" class="form-control" :class="{error: false}">
      <span class="help-block">{{ $trans('checkout.delivery_step.validation_middle_name_') }}</span>
    </div>
    <div class="col_full">
      <label>{{ $trans('checkout.delivery_step.form_second_name*') }}</label>
      <input type="text" name="delivery-form-second-name" class="form-control" :class="{error: false}">
      <span class="help-block">{{ $trans('checkout.delivery_step.validation_second_name_') }}</span>
    </div>
    <div v-if="void 'enabledRecipientType'" class="col_full" data-recipient-type="business">
      <label>{{ $trans('checkout.delivery_step.form_company_name') }}</label>
      <input type="text" class="form-control" :class="{error: false}" name="delivery-form-company-name">
    </div>
    <div v-if="void 'enabledRecipientType'" class="col_full" data-recipient-type="business">
      <label>{{ $trans('checkout.delivery_step.form_edrpou') }}</label>
      <input type="text" class="form-control" :class="{error: false}" name="delivery-form-edrpou">
    </div>
    <div class="col_full address" :class="{'has-error': false}">
      <label>{{ $trans('checkout.delivery_step.form_city') }}:</label>
      <select name="delivery-form-city" class="form-control select2 select-delivery-city" required>
        <option v-if="void 'city'" :value="city">{{ city.Description || city.Present || '' }}</option>
      </select>
    </div>
    <div class="col_full address" :class="{'has-error': false}">
      <label>{{ $trans('checkout.delivery_step.form_warehouse') }}</label>
      <select name="delivery-form-warehouse" class="form-control select2 select-delivery-warehouse" required>
        <option v-if="void 'warehouse'" :value="warehouse">{{ warehouse.Description || '' }}</option>
      </select>
    </div>
    <div class="clear"></div>
    <div class="col_half">
      <label for="delivery-form-email">{{ $trans('checkout.delivery_step.form_email') }}:</label>
      <input type="email" id="delivery-form-email" name="delivery-form-email" class="form-control" :class="{error: false}" required />
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
