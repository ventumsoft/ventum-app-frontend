<template>
  <div>
    {{ $trans('account.orders.statuses.' + order.status) }}
    <br>
    <a v-if="order.isCancellable" href="#" @click.prevent="!cancelling && cancelOrder(order)">
      <span class="label label-danger">{{ cancelling ? $trans('account.orders.rows.cancelling') : $trans('account.orders.rows.cancel') }}</span>
    </a>
    <template v-if="(order.status === OrderStatusEnum.SENT) && order.deliveryData?.tracknumber">
      <span>{{ $trans('account.orders.rows.trackingnumber') }}:</span>
      <a
        v-if="order.deliveryData.link_tracknumber"
        :href="order.deliveryData.link_tracknumber + order.deliveryData.tracknumber"
        target="_blank"
      >
        {{ order.deliveryData.tracknumber }}
      </a>
      <template v-else>
        <br>{{ order.deliveryData.tracknumber }}
      </template>
    </template>
    <a v-if="order.isRepeatable" href="#" @click.prevent="!repeating && repeatOrder(order)">
      <span class="label label-success">{{ repeating ? $trans('account.orders.rows.repeating') : $trans('account.orders.rows.repeat') }}</span>
    </a>
  </div>
</template>

<script>
import OrderStatusEnum from '@/enums/OrderStatusEnum';
import MobileDetect from 'mobile-detect';

export default {
  props: ['order'],
  data: () => ({
    OrderStatusEnum,
    cancelling: false,
    repeating: false,
  }),
  methods: {
    async cancelOrder(order) {
      this.cancelling = true;
      await this.$axios.post('user/order/cancel', {id: order.id});
      this.$noty(this.$trans('account.orders.rows.cancelled'));
      this.cancelling = false;
      // replace order in datatable
    },
    async repeatOrder(order) {
      this.repeating = true;
      await this.$axios.post('user/order/repeat', {
        id: order.id,
        device_type: (new MobileDetect(window.navigator.userAgent)).mobile() ? 'mobile' : 'desktop',
      });
      this.$noty(this.$trans('account.orders.rows.repeated'));
      this.repeating = false;
      // reload datatable
    },
  },
}
</script>
