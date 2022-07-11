<template>
  <div class="col_full" :class="{'has-error': false}">
    <label>{{ $trans('checkout.delivery_step.form_country') }}:</label>
    <select class="form-control">
      <option
        v-for="country of []"
        :value="country.id"
        :selected="country.id == $store.state.checkout.deliveryData?.country_id"
      >{{ country.name }}</option>
    </select>
  </div>
</template>
