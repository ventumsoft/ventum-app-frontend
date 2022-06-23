<template>
  <ul class="media-list chat-list content-group chat-messages">
    <MessengersChatMessage
      v-if="!ticket?.messages?.length"
      :message="{
          own: false,
          authorName: welcome.name,
          avatar: welcome.avatar,
          message: $store.state.site.settings?.['helpdesk:chat-welcome-online'] || $trans('chat.welcome'),
          createdAt: new Date,
        }"
    />
    <MessengersChatMessage
      v-for="message of (ticket?.messages || [])"
      :key="message.id"
      :message="message"
    />
  </ul>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('chat', [
      'ticket',
      'welcome',
    ]),
  },
  mounted() {
    this.scrollMessagesToBottom();
  },
  watch: {
    'ticket.messages.length'() {
      this.scrollMessagesToBottom();
    },
  },
  methods: {
    scrollMessagesToBottom() {
      setTimeout(() => {
        this.$el.scrollTop = this.$el.scrollHeight;
      }, 0);
    },
  },
}
</script>
