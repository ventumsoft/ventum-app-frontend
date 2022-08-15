<template>
  <div class="tab-content checkout-payment-block">
    <div v-if="paymentStepLoading" class="form-process"></div>
    <div class="row clearfix checkout-payment-block-content">
      <div class="col-md-6">
        <h3>{{ $trans('checkout.payment_step.choose_system_title') }}</h3>
        <form v-if="paymentSystems?.length" id="payment-select" class="nobottommargin" @submit.prevent>
          <div v-for="paymentSystem of paymentSystems" class="bottommargin-sm">
            <input
              :id="'payment-type-' + paymentSystem.id"
              class="radio-style"
              type="radio"
              :checked="selectedPaymentSystem?.id === paymentSystem.id"
              @change="changePaymentSystem(paymentSystem)"
            >
            <label :for="'payment-type-' + paymentSystem.id" class="radio-style-2-label radio-small">
              {{ paymentSystem.name }}
              <span v-if="paymentSystem.checkout.paymentPrice" class="lowercase">(+{{ paymentSystem.checkout.paymentPrice }})</span>
            </label>
            <p class="nobottommargin">{{ paymentSystem.description }}</p>
          </div>
          <div v-if="$auth.user.balanceValue && selectedPaymentSystem?.checkout?.allowedUsingBonuses" class="bottommargin-sm">
            <input
              id="bonus_account"
              class="checkbox-style"
              type="checkbox"
              :checked="useBonuses"
              @change="$store.commit('checkout/payment/update', {useBonuses: !useBonuses})"
            >
            <label for="bonus_account" class="checkbox-style-2-label checkbox-small">
              {{ $trans('checkout.payment_step.bonus_account_name') }}
              <span class="lowercase">({{ $currency($auth.user.balanceValue) }})</span>
            </label>
            <p class="nobottommargin">{{ $trans('checkout.payment_step.bonus_account_help_text').replace(':limit', $store.state.site.settings?.['orders:bonus-payment-limit'] + '%') }}. </p>
          </div>
          <div v-if="!availablePaymentRoutes?.length" class="alert alert-danger payment-route-not-found">
            {{ $trans('checkout.payment_step.payment_not_found_for_delivery') }}
          </div>
        </form>
        <div v-else class="alert alert-danger">
          {{ $trans('checkout.payment_step.payment_not_found_for_delivery') }}
        </div>
        <div class="table-responsive payment-price-table">
          <table class="table cart">
            <tbody>
            <tr class="cart_item">
              <td class="notopborder cart-product-name">
                <strong>{{ $trans('checkout.payment_step.table_product_price') }}</strong>
              </td>
              <td class="notopborder cart-product-subtotal">
                <span class="amount">{{ totalWithoutDiscount }}</span>
              </td>
            </tr>
            <tr v-if="!(void 'is_recipient_payer')" class="cart_item">
              <td class="cart-product-name">
                <strong>{{ $trans('checkout.payment_step.table_delivery_price') }}</strong>
              </td>
              <td class="cart-product-subtotal">
                <span class="amount">{{ deliveryPrice }}</span>
              </td>
            </tr>
            <tr v-if="selectedPaymentSystem" class="payment-price-row">
              <td class="cart-product-name">
                <strong>{{ $trans('checkout.payment_step.table_payment_price') }}</strong>
              </td>
              <td class="cart-product-subtotal">
                <span class="amount">{{ selectedPaymentSystem.checkout.paymentPrice }}</span>
              </td>
            </tr>
            <tr v-for="discount of (selectedPaymentSystem ? selectedPaymentSystem.checkout.discounts : discounts)" class="cart-discount-payment">
              <td class="">
                <span class=""><strong>{{ discount.name }}:</strong></span>
              </td>
              <td class="cart-product-subtotal ">
                <span class="amount">- {{ discount.value }}</span>
              </td>
            </tr>
            <tr v-if="useBonuses" class="payment-use-bonus-row">
              <td class="cart-product-name">
                <strong>{{ $trans('checkout.payment_step.used_sum_bonus') }}:</strong>
              </td>
              <td class="cart-product-subtotal">
                <span class="amount">{{ selectedPaymentSystem.checkout.allowedUsingBonuses }}</span>
              </td>
            </tr>
            <tr v-if="selectedPaymentSystem ? selectedPaymentSystem.checkout.bonus : bonus" class="cart-discount-payment">
              <td class="">
                <span class=""><strong>{{ $trans('checkout.goods_step.label_bonus') }}:</strong></span>
              </td>
              <td class="cart-product-subtotal ">
                <span class="amount">{{ selectedPaymentSystem ? selectedPaymentSystem.checkout.bonus : bonus }}</span>
              </td>
            </tr>
            <tr v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="payment-tax-row">
              <td class="cart-product-name">
                <strong>{{ $store.state.site.settings?.['pricing:tax-name-str'] }}:</strong>
              </td>
              <td class="cart-product-subtotal">
                <span class="amount">{{ selectedPaymentSystem ? selectedPaymentSystem.checkout.vat : vat }}</span>
              </td>
            </tr>
            <tr class="payment-total-price-row">
              <td class="cart-product-name">
                <strong>{{ $trans('checkout.payment_step.table_total') }}:</strong>
              </td>
              <td class="cart-product-subtotal">
                <span class="amount color lead"><strong>{{ selectedPaymentSystem ? (useBonuses ? selectedPaymentSystem.checkout.totalWithDiscountAndUsedBonuses : selectedPaymentSystem.checkout.totalWithDiscount) : totalWithDiscount }}</strong></span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-6 payment-forms">
        <h3>{{ $trans('checkout.payment_step.buyer_data') }}</h3>
        <CheckoutPaymentForm />
      </div>
    </div>
    <TheLink v-if="true" :to="'#'" :class="'button button-rounded button-reveal tright nomargin fright ' + (true ? 'disabled' : '')">
      <i class="icon-arrow-right2"></i><span>{{ $trans('checkout.payment_step.next_step_btn') }}</span>
    </TheLink>
    <TheLink :to="$page({name: 'checkout/delivery'})" class="button button-rounded button-reveal  button-amber notopmargin fright">
      <i class="icon-arrow-left2"></i><span>{{ $trans('checkout.payment_step.delivery_step_btn') }}</span>
    </TheLink>
  </div>
</template>

<script>
import PaymentSystemTypeEnum from '@/enums/PaymentSystemTypeEnum';
import {mapGetters, mapState} from 'vuex';

export default {
  data: () => ({
    PaymentSystemTypeEnum,
  }),
  computed: {
    ...mapState('cart', [
      'items',
      'totalWithoutDiscount',
      'totalWithDiscount',
      'discounts',
      'bonus',
      'vat',
    ]),
    ...mapState('checkout/payment', [
      'paymentStepLoading',
      'deliveryPrice',
      'paymentSystems',
      'selectedPaymentSystem',
      'useBonuses',
      'paymentData',
    ]),
    ...mapGetters('checkout/payment', [
      'availablePaymentRoutes',
    ]),
  },
  watch: {
    availablePaymentRoutes() {
      console.log('watch availablePaymentRoutes, first: ', JSON.stringify(this.availablePaymentRoutes?.[0]));
    },
  },
  methods: {
    async changePaymentSystem(paymentSystem) {
      this.$store.commit('checkout/payment/update', {selectedPaymentSystem: paymentSystem/*, useBonuses: false*/});
      this.$store.commit('checkout/payment/paymentData', {payment_system_id: paymentSystem.id});
      await this.$store.dispatch('checkout/payment/fetchPaymentStepData', {withoutPaymentData: true});
    },
  },
}
</script>
