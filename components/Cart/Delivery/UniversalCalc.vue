<template>
  <form class="nobottommargin" @submit.prevent>
    <div class="col_full">
      <label for="delivery-form-name">{{ $trans('checkout.delivery_step.form_first_name') }}</label>
      <input type="text" id="delivery-form-name" name="delivery-form-name" class="form-control" :class="{error: false}" required />
    </div>
    <div class="col_full">
      <label for="shipping_form_second_name">{{ $trans('checkout.delivery_step.form_second_name*') }}</label>
      <input type="text" id="shipping_form_second_name" name="delivery-form-second-name" class="form-control" :class="{error: false}" required />
    </div>
    <div v-if="$store.state.site.settings?.['general:multicountry']" class="col_full">
      <label>{{ $trans('checkout.delivery_step.form_country') }}:</label>
      <select class="form-control" name="delivery-form-country">
        <option
          v-for="country of []"
          :value="country.id"
          :selected="country.id === false"
        >{{ country.name }}</option>
      </select>
    </div>
    <div class="col_full address">
      <label for="delivery-form-address">{{ $trans('checkout.delivery_step.form_address') }}:</label>
      <input type="text" id="delivery-form-address" name="delivery-form-address" class="form-control" :class="{error: false}" required />
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
