<template>
  <div class="tab-content checkout-payment-block">
    <div v-if="loading" class="form-process"></div>
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
              @change="selectedPaymentSystem = paymentSystem"
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
              v-model="useBonuses"
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
            <tr v-if="deliveryPrice" class="cart_item">
              <td class="cart-product-name">
                <strong>{{ $trans('checkout.payment_step.table_delivery_price') }}</strong>
              </td>
              <td class="cart-product-subtotal">
                <span class="amount">{{ deliveryPrice }}</span>
              </td>
            </tr>
            <tr v-if="selectedPaymentSystem && selectedPaymentSystem.checkout.paymentPrice" class="payment-price-row">
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
        <form class="nobottommargin payment-type-form" @submit.prevent>
          <div class="control-block">
            <UserPaymentFields
              v-bind="{
                userTypesFields,
                taxationSystems,
                paymentData,
                errors,
              }"
            />
          </div>
        </form>
      </div>
    </div>
    <a
      v-if="availablePaymentRoutes?.length"
      href="#"
      :class="'button button-rounded button-reveal tright nomargin fright ' + ((!selectedPaymentSystem || loading) ? 'disabled' : '')"
      @click.prevent="handleCheckout"
    >
      <i class="icon-arrow-right2"></i><span>{{ $trans('checkout.payment_step.next_step_btn') }}</span>
    </a>
    <TheLink :to="$page({name: 'checkout/delivery'})" class="button button-rounded button-reveal  button-amber notopmargin fright">
      <i class="icon-arrow-left2"></i><span>{{ $trans('checkout.payment_step.delivery_step_btn') }}</span>
    </TheLink>
  </div>
</template>

<script>
import PaymentSystemTypeEnum from '@/enums/PaymentSystemTypeEnum';
import PaymentResultEnum from '@/enums/PaymentResultEnum';
import MobileDetect from 'mobile-detect';
import {mapState} from 'vuex';
import _pick from "lodash/pick";

export default {
  props: [
    'deliveryPrice',
    'paymentSystems',
    'paymentRoutes',
    'userTypesFields',
    'taxationSystems',
    'paymentData',
  ],
  data: ({$props}) => ({
    PaymentSystemTypeEnum,
    loading: false,
    selectedPaymentSystem: $props.paymentSystems?.find(paymentSystem => paymentSystem.id == $props.paymentData?.['payment_system_id']) || $props.paymentSystems?.[0] || null,
    useBonuses: false,
    errors: null,
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
    availablePaymentRoutes() {
      return this.paymentRoutes?.filter(paymentRoute =>
        ((paymentRoute.userType === 'all') || (paymentRoute.userType === this.paymentData?.type_user)) &&
        ((paymentRoute.taxPayer === 'all') || (paymentRoute.taxPayer === 'tax_payer') && (this.paymentData?.is_vat_payer === 'vat') || (paymentRoute.taxPayer === 'not_tax_payer') && (this.paymentData?.is_vat_payer === 'tax')) &&
        ((paymentRoute.paymentSystemsIds === 'all') || paymentRoute.paymentSystemsIds?.includes(this.selectedPaymentSystem?.id)) &&
        ((paymentRoute.countriesIds === 'all') || paymentRoute.countriesIds?.includes(this.paymentData?.country_id)) &&
        ((paymentRoute.taxationSystemsIds === 'all') || paymentRoute.taxationSystemsIds?.includes(this.paymentData?.taxation_system_id))
      )
    },
  },
  methods: {
    async handleCheckout() {
      this.loading = true;
      this.errors = null;
      const paymentDataFields = [...this.$el.querySelectorAll('[data-payment-data-field]')].map(element => element.dataset.paymentDataField);
      try {
        await this.$axios.post('checkout/payment/data', {
          payment_system_id: this.selectedPaymentSystem?.id,
          payment_route_id: this.availablePaymentRoutes?.[0]?.id,
          ..._pick(this.paymentData, paymentDataFields),
        }, {silenceException: true});
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        return;
      } finally {
        this.loading = false;
      }
      const {data: {
        clientRedirect,
        redirectUrl,
        orderNumber,
        success,
      }} = await this.$axios.post('checkout/order', {
        delivery_system_id: this.$store.state.checkout.delivery.selectedDeliverySystem?.id,
        payment_system_id: this.selectedPaymentSystem?.id,
        payment_route_id: this.availablePaymentRoutes?.[0]?.id,
        use_bonus: this.useBonuses,
        device_type: (new MobileDetect(window.navigator.userAgent)).mobile() ? 'mobile' : 'desktop',
      });
      if (clientRedirect?.public_key && clientRedirect?.session?.id) {
        Stripe(clientRedirect.public_key).redirectToCheckout({sessionId: clientRedirect.session.id});
        return;
      }
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
      this.$store.commit('checkout/success/update', {
        orderNumber,
        paymentResult: success ? null : PaymentResultEnum.FAIL,
      });
      this.$router.push(this.$page({name: 'checkout/success'}));
    },
  },
}
</script>
