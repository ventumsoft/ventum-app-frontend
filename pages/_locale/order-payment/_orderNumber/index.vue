<template>
  <fragment>
    <PageTitle
      :title="$trans('order.payment.page-title').replace(':order_number', $route.params.orderNumber)"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
        {title: $trans('order.payment.breadcrumb-title').replace(':order_number', $route.params.orderNumber)},
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
                  </form>
                  <div class="table-responsive payment-price-table">
                    <table class="table cart">
                      <tbody>
                      <tr class="cart_item">
                        <td class="notopborder cart-product-name">
                          <strong>{{ $trans('order.payment.table_product_price') }}</strong>
                        </td>
                        <td class="notopborder cart-product-subtotal">
                          <span class="amount">{{ totalWithoutDiscount }}</span>
                        </td>
                      </tr>
                      <tr v-if="deliveryPrice" class="cart_item">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.table_delivery_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ deliveryPrice }}</span>
                        </td>
                      </tr>
                      <tr v-if="selectedPaymentSystem && selectedPaymentSystem.checkout.paymentPrice" class="payment-price-row">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.table_payment_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ selectedPaymentSystem.checkout.paymentPrice }}</span>
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
                          <strong>{{ $trans('order.payment.table_total') }}:</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount color lead"><strong>{{ selectedPaymentSystem ? (useBonuses ? selectedPaymentSystem.checkout.totalWithDiscountAndUsedBonuses : selectedPaymentSystem.checkout.totalWithDiscount) : totalWithDiscount }}</strong></span>
                        </td>
                      </tr>
                      <tr>
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.paid_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount">{{ 'paid_price' }}</span>
                        </td>
                      </tr>
                      <tr class="payment-total-price-row">
                        <td class="cart-product-name">
                          <strong>{{ $trans('order.payment.unpaid_price') }}</strong>
                        </td>
                        <td class="cart-product-subtotal">
                          <span class="amount color lead"><strong class="unpaid-price-value">{{ 'unpaid_price' }}</strong></span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 payment-forms">
                  <h3>{{ $trans('order.payment.buyer_data') }}</h3>
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
                href="#"
                :class="'button button-rounded button-reveal tright nomargin fright ' + (((void 'isBlockedEditing') || !selectedPaymentSystem || loading) ? 'disabled' : '')"
                @click.prevent="submitPaymentForm"
              >
                <i class="icon-arrow-right2"></i>
                <span>{{ $trans((void 'online') ? 'order.payment.submit.online' : 'order.payment.submit.offline') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
export default {
  async asyncData({params, $axios}) {
    const {data: {
      deliveryPrice,
      paymentSystems,
      userTypesFields,
      taxationSystems,
      paymentData,
    }} = await $axios.get('order-payment/data', {params: {orderNumber: params.orderNumber}});
    return {
      deliveryPrice,
      paymentSystems,
      userTypesFields,
      taxationSystems,
      paymentData,
    };
  },
  data: () => ({
    loading: false,
    selectedPaymentSystem: null,
    useBonuses: false,
    errors: null,
  }),
  methods: {
    async submitPaymentForm() {
      this.loading = true;
      this.errors = null;
      let success;
      try {
        ({data: {success}} = await this.$axios.post('order-payment/submit', this.paymentData, {silenceException: true}));
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
      if (success) {
        this.$noty(this.$trans('account.profile.saved'));
      }
    },
  },
}
</script>
