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
      <TheLink :to="'#'" class="button button-rounded button-reveal notopmargin" target="_blank">
        <i class="icon-download"></i>
        <span>{{ $trans('checkout.finish_step.documents') }}</span>
      </TheLink>
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
import _pick from 'lodash/pick';
import PaymentResultEnum from '@/enums/PaymentResultEnum';
import PersonalAccountTabEnum from '@/enums/PersonalAccountTabEnum';
import {mapState} from 'vuex';

export default {
  middleware: [
    'authenticate',
    async function ({params, store, redirect, $page}) {
      if (!params.orderNumber) {
        redirect($page({name: 'checkout/cart'}));
        return;
      }
      await store.dispatch('checkout/success/fetchOrderResultData', _pick(params, [
        'orderNumber',
        'paymentResult',
      ]));
    },
  ],
  data: () => ({
    PersonalAccountTabEnum,
  }),
  computed: {
    ...mapState('checkout/success', [
      'orderNumber',
      'paymentResult',
      'documentsExists',
      'documentsPending',
      'agentShowcaseUrl',
    ]),
    paymentResultClass() {
      return {
        [PaymentResultEnum.PENDING]: 'info',
        [PaymentResultEnum.SUCCESS]: 'success',
        [PaymentResultEnum.FAIL]: 'danger',
      };
    },
  },
  mounted() {
    this.$store.dispatch('checkout/clear');
  },
  beforeDestroy() {
    this.$store.commit('checkout/success/clear');
  },
}
</script>
