<template>
  <fragment>
    <div v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="col_full">
      <div class="col_one_third">
        <label for="payment-form-vat">{{ $trans('checkout.payment_step.cash_on_delivery.vat_or_tax') }}</label>
        <div>
          <input
            id="payment-form-vat-no"
            class="radio-style payment-form-is-vat-payer"
            type="radio"
            name="payment-form-is-vat-payer"
            value="tax"
            :checked="paymentData?.['is_vat_payer'] === 'tax'"
            @input="$store.commit('checkout/payment/paymentData', {is_vat_payer: 'tax'})"
          >
          <label for="payment-form-vat-no" class="radio-style-2-label radio-small">
            {{ $trans('checkout.payment_step.cash_on_delivery.vat_or_tax_no') }}
          </label>
          <input
            id="payment-form-vat-yes"
            class="radio-style payment-form-is-vat-payer"
            type="radio"
            name="payment-form-is-vat-payer"
            value="vat"
            :checked="paymentData?.['is_vat_payer'] === 'vat'"
            @input="$store.commit('checkout/payment/paymentData', {is_vat_payer: 'vat'})"
          >
          <label for="payment-form-vat-yes" class="radio-style-2-label radio-small color">
            {{ $trans('checkout.payment_step.cash_on_delivery.vat_or_tax_yes') }}
          </label>
        </div>
      </div>
      <div v-if="paymentData?.['is_vat_payer'] === 'tax'" class="col_two_third col_last tax-number">
        <label for="payment-form-tax" class="vat-type">{{ $trans('checkout.payment_step.cash_on_delivery.tax_number') }}</label>
        <input
          type="text"
          id="payment-form-tax"
          class="form-control"
          :class="{error: Boolean(errors?.['tax_number'])}"
          :value="paymentData.tax_number"
        >
      </div>
      <div v-if="paymentData?.['is_vat_payer'] === 'vat'" class="col_two_third col_last vat-number form-group">
        <label for="payment-form-vat" class="vat-type control-label">{{ $trans('checkout.payment_step.cash_on_delivery.vat_number') }}</label>
        <div class="form-group has-feedback">
          <input
            type="text"
            id="payment-form-vat"
            class="form-control"
            :class="{error: Boolean(errors?.['vat_number'])}"
            :value="paymentData.vat_number"
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
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('checkout/payment', [
      'paymentData',
      'errors',
    ]),
  },
  mounted() {
    if (this.$store.state.site.settings?.['pricing:is-taxpayer']) {
      if (!this.paymentData?.is_vat_payer) {
        this.$store.commit('checkout/payment/paymentData', {is_vat_payer: 'tax'});
      }
    }
  },
}
</script>
