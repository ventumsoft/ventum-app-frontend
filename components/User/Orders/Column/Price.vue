<template>
  <div>
    <span class="value" style="font-weight: normal;font-size: 14px;">{{ $currency(order.price) }}</span>
    <br>
    <a
      v-if="order.hasLatestDocumentsForUser"
      href="#"
      @click.prevent="$download('user/order/documents', {number: order.number}, 'archive-documents-' + order.number + '.zip')"
    >
      {{ $trans('account.orders.archive_documents') }}
    </a>
    <br/>
    <span>{{ $trans('account.orders.payment_statuses.' + order.paymentStatus) }}</span>
    <br>
    <TheLink v-if="isVisiblePaymentLink" :to="$page({name: 'order-payment/orderNumber', params: {orderNumber: order.number}})">
      {{ (order.paymentStatus === OrderPaymentStatusEnum.UNPAID) && $trans('account.orders.rows.pay') || (order.paymentStatus === OrderPaymentStatusEnum.PARTLY_PAID) && $trans('account.orders.rows.payextra') || '' }}
    </TheLink>
  </div>
</template>

<script>
import OrderStatusEnum from '@/enums/OrderStatusEnum';
import OrderPaymentStatusEnum from '@/enums/OrderPaymentStatusEnum';

export default {
  props: ['order'],
  data: () => ({
    OrderPaymentStatusEnum,
  }),
  computed: {
    isVisiblePaymentLink() {
      return (this.order.status !== OrderStatusEnum.REFUSED) &&
        (this.order.status !== OrderStatusEnum.CANCELLED) &&
        ((this.order.paymentStatus === OrderPaymentStatusEnum.UNPAID) || (this.order.paymentStatus === OrderPaymentStatusEnum.PARTLY_PAID));
    },
  },
}
</script>
