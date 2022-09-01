<template>
  <div>
    <a href="#" @click.prevent="$emit('messages', order)">
      <span class="orders-table"><i class="icon-chat-2 icon-order"></i> <span class="count">{{ order.ticketMessagesTotalCount }}</span></span>
      <span v-if="order.ticketMessagesUnreadCount" class="new-block"><br>{{ $trans('account.orders.rows.messages.new') }}: <span class="new-count">{{order.ticketMessagesUnreadCount}}</span></span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['order'],
}
</script>
