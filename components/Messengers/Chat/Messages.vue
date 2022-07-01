<template>
  <ul class="media-list chat-list content-group chat-messages">
    <template v-if="!ticket?.messages?.length">
      <li class="media date-step content-divider chat-message-date">
        <span class="chat-message-date-text">{{ $dt(new Date, 'date') }}</span>
      </li>
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
    </template>
    <template v-for="message of (ticket?.messages || [])">
      <li v-if="firstMessagesAtDays.has(message.id)" class="media date-step content-divider chat-message-date">
        <span class="chat-message-date-text">{{ firstMessagesAtDays.get(message.id) }}</span>
      </li>
      <MessengersChatMessage
        :key="message.id"
        :message="message"
      />
    </template>
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
    firstMessagesAtDays() {
      const result = new Map;
      let lastDay;
      for (const message of this.ticket?.messages) {
        const messageDay = this.$dt(message.createdAt, 'date');
        if (messageDay !== lastDay) {
          result.set(message.id, messageDay);
        }
        lastDay = messageDay;
      }
      return result;
    },
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
