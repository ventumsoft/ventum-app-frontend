<template>
  <fragment>
    <PageTitle
      :title="$trans('order.payment.page-title').replace(':order_number', order.number)"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
        {title: $trans('order.payment.breadcrumb-title').replace(':order_number', order.number)},
      ]"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div id="processTabs" style="margin-top: 30px;">
            <div class="tab-content">
              <div v-if="loading" class="form-process"></div>
              <div class="row clearfix">
                <div class="col-md-6">
                  <h3>{{ $trans('order.payment.choose_system_title') }}</h3>
                  <form v-if="paymentSystems?.length" id="payment-select" class="nobottommargin" @submit.prevent>
                    <div v-for="paymentSystem of paymentSystems" class="bottommargin-sm">
                      <input
                        :id="'payment-type-' + paymentSystem.id"
                        class="radio-style"
                        type="radio"
                        :disabled="order.isBlockedEditing"
                        :checked="selectedPaymentSystem?.id === paymentSystem.id"
                        @change="selectedPaymentSystem = paymentSystem"
                      >
                      <label :for="'payment-type-' + paymentSystem.id" class="radio-style-2-label radio-small">
                        {{ paymentSystem.name }}
                        <span v-if="paymentSystem.forOrder.paymentPriceFull" class="lowercase">(+{{ paymentSystem.forOrder.paymentPriceFull }})</span>
                      </label>
                      <p class="nobottommargin">{{ paymentSystem.description }}</p>
                    </div>
                    <div v-if="$auth.user.balanceValue && selectedPaymentSystem?.forOrder?.allowedUsingBonuses" class="bottommargin-sm">
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
                  </form>
                  <div class="table-responsive payment-price-table">
                    <table class="table cart">
                      <tbody>
                      <tr class="cart_item">
                        <td class="notopborder cart-product-name">
                          <strong>{{ $trans('order.payment.table_product_price') }}</strong>
                        </td>
                        <td class="notopborder cart-product-subtotal">
                          <span class="amount">{{ order.productsPrice }}</span>
                        </td>
                      </tr>
                      <tr v-if="order.deliveryPrice" class="cart_item">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.table_delivery_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ order.deliveryPrice }}</span>
                        </td>
                      </tr>
                      <tr v-if="selectedPaymentSystem && selectedPaymentSystem.forOrder.paymentPrice" class="payment-price-row">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.table_payment_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ selectedPaymentSystem.forOrder.paymentPrice }}</span>
                        </td>
                      </tr>
                      <tr v-for="extraSum of order.extraSums">
                        <td class="cart-product-name">
                          <strong>{{ extraSum.name }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          {{ extraSum.value }}
                        </td>
                      </tr>
                      <tr v-for="discount of order.discounts">
                        <td class="cart-product-name">
                          <strong>{{ discount.name }}:</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">- {{ discount.value }}</span>
                        </td>
                      </tr>
                      <tr v-if="order.usedBonuses || useBonuses" class="payment-use-bonus-row">
                        <td class="cart-product-name">
                          <strong>{{ $trans('checkout.payment_step.used_sum_bonus') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ order.usedBonuses || selectedPaymentSystem.forOrder.allowedUsingBonuses }}</span>
                        </td>
                      </tr>
                      <tr v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="payment-tax-row">
                        <td class="cart-product-name">
                          <strong>{{ $store.state.site.settings?.['pricing:tax-name-str'] }}:</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ selectedPaymentSystem ? selectedPaymentSystem.forOrder.vat : order.vat }}</span>
                        </td>
                      </tr>
                      <tr class="payment-total-price-row">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.table_total') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ selectedPaymentSystem ? ((!order.usedBonuses && useBonuses) ? selectedPaymentSystem.forOrder.orderTotalWithUsedBonuses : selectedPaymentSystem.forOrder.orderTotal) : order.total }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.paid_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ order.paidPrice }}</span>
                        </td>
                      </tr>
                      <tr class="payment-total-price-row">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.unpaid_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount color lead"><strong class="unpaid-price-value">{{ selectedPaymentSystem ? ((!order.usedBonuses && useBonuses) ? selectedPaymentSystem.forOrder.unPaidPriceWithUsedBonuses : selectedPaymentSystem.forOrder.unPaidPrice) : order.unPaidPrice }}</strong></span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 payment-forms">
                  <h3>{{ $trans('order.payment.buyer_data') }}</h3>
                  <form ref="form" class="nobottommargin payment-type-form" @submit.prevent>
                    <div class="control-block">
                      <CheckoutPaymentFields
                        v-bind="{
                          userTypesFields,
                          taxationSystems,
                          paymentData,
                          errors,
                        }"
                        :isAllowedChangingUserType="order.isAllowedChangingUserType"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <a
                href="#"
                :class="'button button-rounded button-reveal tright nomargin fright ' + ((!selectedPaymentSystem || order.isBlockedEditing && !selectedPaymentSystem.isOnline || loading) ? 'disabled' : '')"
                @click.prevent="submitPaymentForm"
              >
                <i class="icon-arrow-right2"></i>
                <span>{{ $trans(selectedPaymentSystem?.isOnline ? 'order.payment.submit.online' : 'order.payment.submit.offline') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import _pick from 'lodash/pick';

export default {
  head() {
    return {
      script: [
        {src: 'https://js.stripe.com/v3/', body: true},
      ],
    };
  },
  async asyncData({params: {orderNumber}, $axios}) {
    const {data: order} = await $axios.get('user/order', {params: {number: orderNumber, checkout: true}});
    const {data: userTypesFields} = await $axios.get('checkout/payment/user-types-fields');
    const {data: taxationSystems} = await $axios.get('checkout/payment/taxation-systems');
    const {data: {paymentSystems, paymentRoutes}} = await $axios.get('checkout/payment/systems-and-routes', {params: {orderNumber}});
    const {data: paymentData} = await $axios.get('order/payment/data', {params: {orderNumber}});
    return {
      order,
      userTypesFields,
      taxationSystems,
      paymentSystems,
      paymentRoutes,
      paymentData,
      selectedPaymentSystem: paymentSystems.find(paymentSystem => paymentSystem.id === order.paymentSystemId) || null,
    };
  },
  data: () => ({
    loading: false,
    useBonuses: false,
    errors: null,
  }),
  computed: {
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
    async submitPaymentForm() {
      this.loading = true;
      this.errors = null;
      if (!this.order.isBlockedEditing) {
        const paymentDataFields = [...this.$refs.form.querySelectorAll('[data-payment-data-field]')].map(element => element.dataset.paymentDataField);
        let success;
        try {
          ({data: {success}} = await this.$axios.post('order/payment/data', {
            order_id: this.order.id,
            payment_system_id: this.selectedPaymentSystem?.id,
            payment_route_id: this.availablePaymentRoutes?.[0]?.id,
            use_bonus: this.useBonuses,
            ..._pick(this.paymentData, paymentDataFields),
          }, {silenceException: true}));
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
        if (!this.selectedPaymentSystem.isOnline) {
          this.$router.push(this.$page({name: success ? 'order-payment/orderNumber/saved' : 'order-payment/orderNumber/failed', params: {orderNumber: this.order.number}}));
          return;
        }
      }
      if (!this.selectedPaymentSystem.isOnline) {
        return;
      }
      const {data: {
        clientRedirect,
        redirectUrl,
        success,
      }} = await this.$axios.post('order/payment/pay', {
        order_id: this.order.id,
      });
      if (clientRedirect?.public_key && clientRedirect?.session?.id) {
        Stripe(clientRedirect.public_key).redirectToCheckout({sessionId: clientRedirect.session.id});
        return;
      }
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
      this.$router.push(this.$page({name: success ? 'order-payment/orderNumber/saved' : 'order-payment/orderNumber/failed', params: {orderNumber: this.order.number}}));
    },
  },
}
</script>
