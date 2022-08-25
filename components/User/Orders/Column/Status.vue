<template>
  <div>
    {{ $trans('account.orders.statuses.' + order.status) }}
    <br>
    <a v-if="order.isCancellable" href="#" class="account-orders-cancel" @click.prevent>
      <span class="label label-danger">{{ $trans('account.orders.rows.cancel') }}</span>
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
    <a v-if="order.isRepeatable" href="#" class="account-orders-repeat" @click.prevent>
      <span class="label label-success">{{ $trans('account.orders.rows.repeat') }}</span>
    </a>
  </div>
</template>

<script>
import OrderStatusEnum from '@/enums/OrderStatusEnum';

export default {
  props: ['order'],
  data: () => ({
    OrderStatusEnum,
  }),
}
</script>
