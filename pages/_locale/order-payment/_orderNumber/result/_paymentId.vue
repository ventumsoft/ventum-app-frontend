<template>
  <OrderPaymentResult
    :orderNumber="$route.params.orderNumber"
    :paymentResult="paymentResult"
  />
</template>

<script>
import _pick from 'lodash/pick';

export default {
  middleware: [
    'authenticate',
    async function ({params, query, redirect, $page}) {
      if (query.isNewOrder) {
        redirect($page({name: 'checkout/success', params: _pick(params, [
          'orderNumber',
          'paymentId',
        ])}));
        return;
      }
    },
  ],
  async asyncData({params, $axios}) {
    const {data: {paymentResult}} = await $axios.get('order-payment/result', {params: _pick(params, [
      'orderNumber',
      'paymentId',
    ])});
    return {
      paymentResult,
    };
  },
}
</script>
