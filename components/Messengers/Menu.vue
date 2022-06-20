<template>
  <div class="messengers-block">
    <div class="messengers-block-tooltip-container"></div>

    <a
      v-for="button of (loadedMessengersData.buttons || [])"
      class="messenger-button"
      :href="button.url"
      target="_blank"
      data-toggle="tooltip"
      :title="$trans('chat.write-to.' + button.messenger)"
      data-placement="left"
      data-container=".messengers-block-tooltip-container"
      :data-messenger="button.messenger"
    >
      <i class="icon-2x" :class="button.icon"></i>
    </a>

    <a
      v-if="loadedMessengersData.callMe"
      class="messenger-button call-me"
      href="#"
      data-toggle="tooltip"
      :title="$trans('call-me.tooltip')"
      data-placement="left"
      data-container=".messengers-block-tooltip-container"
    >
      <i class="icon-2x icon-line2-call-in"></i>
    </a>

    <a
      class="messenger-button messenger-button-chat"
      href="#"
      data-toggle="tooltip"
      :title="$trans('chat.write-us')"
      data-placement="left"
      data-container=".messengers-block-tooltip-container"
    >
      <i class="icon-2x icon-chat"></i>
      <div v-show="chatTicketUnreadMessages" class="chat-block-new-count badge">{{ chatTicketUnreadMessages || '' }}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: ['loadedMessengersData'],
  data: () => ({
    chatTicketUnreadMessages: 0,
  }),
}
</script>
