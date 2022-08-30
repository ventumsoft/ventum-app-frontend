<template>
  <fragment>
    <div v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="col_full">
      <div class="col_one_third">
        <label for="payment-form-vat">{{ $trans('account.payment.is_vat_payer') }}</label>
        <div>
          <input
            id="payment-form-vat-no"
            class="radio-style payment-form-is-vat-payer"
            type="radio"
            name="payment-form-is-vat-payer"
            data-payment-data-field="is_vat_payer"
            value="tax"
            :checked="!paymentData.is_vat_payer"
            @input="paymentData.is_vat_payer = 0"
          >
          <label for="payment-form-vat-no" class="radio-style-2-label radio-small">
            {{ $trans('account.payment.is_vat_payer.no') }}
          </label>
          <input
            id="payment-form-vat-yes"
            class="radio-style payment-form-is-vat-payer"
            type="radio"
            name="payment-form-is-vat-payer"
            data-payment-data-field="is_vat_payer"
            value="vat"
            :checked="!!paymentData.is_vat_payer"
            @input="paymentData.is_vat_payer = 1"
          >
          <label for="payment-form-vat-yes" class="radio-style-2-label radio-small color">
            {{ $trans('account.payment.is_vat_payer.yes') }}
          </label>
        </div>
      </div>
      <div v-if="!paymentData.is_vat_payer" class="col_two_third col_last tax-number">
        <label for="payment-form-tax" class="vat-type">{{ $trans('account.payment.tax_number') }}</label>
        <input
          type="text"
          id="payment-form-tax"
          class="form-control"
          :class="{error: Boolean(errors?.['tax_number'])}"
          data-payment-data-field="tax_number"
          v-model="paymentData.tax_number"
        >
      </div>
      <div v-if="paymentData.is_vat_payer" class="col_two_third col_last vat-number form-group">
        <label for="payment-form-vat" class="vat-type control-label">{{ $trans('account.payment.vat_number') }}</label>
        <div class="form-group has-feedback">
          <input
            type="text"
            id="payment-form-vat"
            class="form-control"
            :class="{error: Boolean(errors?.['vat_number'])}"
            data-payment-data-field="vat_number"
            v-model="paymentData.vat_number"
            v-mask="'####################'"
          >
          <span v-show="false" class="form-control-feedback icon-ok vat-status-icon" aria-hidden="true" data-status="success"></span>
          <span v-show="false" class="form-control-feedback icon-remove-sign vat-status-icon" aria-hidden="true" data-status="fail"></span>
        </div>
      </div>
    </div>
    <CheckoutPaymentFieldDefault
      v-else
      :field="'tax_number'"
    />
  </fragment>
</template>

<script>
export default {
  props: ['paymentData', 'errors'],
  mounted() {
    if (this.$store.state.site.settings?.['pricing:is-taxpayer']) {
      if (this.paymentData.is_vat_payer === undefined) {
        this.paymentData.is_vat_payer = 1;
      }
    }
  },
}
</script>
