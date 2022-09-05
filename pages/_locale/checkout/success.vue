<template>
  <div>
    <div
      v-if="paymentResult"
      class="alert"
      :class="'alert-' + paymentResultClass"
      v-html="$trans('order.payment.message.' + paymentResult).replace(':order_number', orderNumber).replace(':client_account_url', $router.resolve($page({name: 'user/' + PersonalAccountTabEnum.ORDERS})).href)"
    ></div>
    <div
      v-else class="alert alert-success"
      v-html="$trans('checkout.finish_message').replace(':order_number', orderNumber).replace(':client_account_url', $router.resolve($page({name: 'user/' + PersonalAccountTabEnum.ORDERS})).href)"
    ></div>
    <div v-if="documentsExists" class="text-center">
      <a
        href="#"
        class="button button-rounded button-reveal notopmargin"
        @click.prevent="$download('user/order/documents', {number: orderNumber}, 'archive-documents-' + orderNumber + '.zip')"
      >
        <i class="icon-download"></i>
        <span>{{ $trans('checkout.finish_step.documents') }}</span>
      </a>
    </div>
    <div v-else-if="documentsPending" class="text-center checkout-finish-documents-loading-block">
      <button type="button" class="button button-rounded notopmargin disabled checkout-finish-documents-loading-button">
        <i class="icon-cog spinner"></i>
        <span>{{ $trans('checkout.finish_step.documents') }}</span>
      </button>
    </div>
    <div v-if="agentShowcaseUrl">
      <TheLink :to="agentShowcaseUrl" class="button button-rounded button-reveal  button-amber notopmargin fright">
        <i class="icon-arrow-left2"></i><span>{{ $trans('checkout.goods_step.order_more_btn') }}</span>
      </TheLink>
    </div>
  </div>
</template>

<script>
import PaymentResultEnum from '@/enums/PaymentResultEnum';
import PersonalAccountTabEnum from '@/enums/PersonalAccountTabEnum';
import {mapState} from 'vuex';

export default {
  middleware: [
    'authenticate',
    async function ({store, redirect, $page}) {
      if (!store.state.checkout.success.orderNumber) {
        redirect($page({name: 'checkout/cart'}));
        return;
      }
    },
  ],
  async asyncData({store, $axios}) {
    const {data: {
      paymentResult,
      documentsExists,
      documentsPending,
      agentShowcaseUrl,
      googleShoppingReviewsCountryCode,
      googleShoppingReviewsEstimatedDeliveryDate,
    }} = await $axios.get('checkout/result', {params: {
      orderNumber: store.state.checkout.success.orderNumber,
      paymentId: store.state.checkout.success.paymentId,
    }});
    return {
      paymentResult: paymentResult || store.state.checkout.success.paymentResult,
      documentsExists,
      documentsPending,
      agentShowcaseUrl,
      googleShoppingReviewsCountryCode,
      googleShoppingReviewsEstimatedDeliveryDate,
    };
  },
  head() {
    return this.$store.state.site.settings?.['seo-integration:google-shopping-reviews:enabled'] && {
      script: [
        {body: true, src: 'https://apis.google.com/js/platform.js?onload=renderOptIn', async: true, defer: true},
        {body: true, innerHTML: `
          window.renderOptIn = function() {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render({
                "merchant_id": ${this.$store.state.site.settings?.['seo-integration:google-shopping-reviews:merchant-id']},
                "order_id": ${this.orderNumber},
                "email": '${this.$auth.user.email}',
                "delivery_country": '${this.googleShoppingReviewsCountryCode}',
                "estimated_delivery_date": '${this.googleShoppingReviewsEstimatedDeliveryDate}',
              });
            });
          }
        `},
      ].filter(v => v),
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
  data: () => ({
    PersonalAccountTabEnum,
  }),
  computed: {
    ...mapState('checkout/success', [
      'orderNumber',
    ]),
    paymentResultClass() {
      return {
        [PaymentResultEnum.PENDING]: 'info',
        [PaymentResultEnum.SUCCESS]: 'success',
        [PaymentResultEnum.FAIL]: 'danger',
      }[this.paymentResult] || 'info';
    },
  },
  mounted() {
    this.$store.dispatch('checkout/clear');
    if (this.documentsPending) {
      this.$echo.private('Api.Site.User.' + this.$auth.user.id)
        .listen('DocumentWasCreated', ({document}) => {
          if (this.orderNumber === document.orderNumber) {
            this.documentsExists = true;
          }
        });
    }
  },
  beforeDestroy() {
    this.$echo.private('Api.Site.User.' + this.$auth.user.id)
      .stopListening('DocumentWasCreated');
    this.$store.commit('checkout/success/clear');
  },
}
</script>
