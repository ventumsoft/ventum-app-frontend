<template>
  <OrderPaymentResult
    :orderNumber="$route.params.orderNumber"
    :paymentResult="PaymentResultEnum.FAIL"
  />
</template>

<script>
import PaymentResultEnum from '@/enums/PaymentResultEnum';

export default {
  data: () => ({
    PaymentResultEnum,
  }),
}
</script>
