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
  ],
  async asyncData({params, query, $axios}) {
    const {data: {paymentResult}} = await $axios.get('order-payment/result', {params: {
      ...query,
      ..._pick(params, [
        'orderNumber',
        'paymentId',
      ]),
    }});
    return {
      paymentResult,
    };
  },
  mounted() {
    if (this.$route.query.isNewOrder) {
      this.$store.commit('checkout/success/update', _pick(this.$route.params, [
        'orderNumber',
        'paymentId',
      ]));
      this.$router.push(this.$page({name: 'checkout/success'}));
      return;
    }
  },
}
</script>
