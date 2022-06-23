<template>
  <div class="messengers-block">
    <div class="messengers-block-tooltip-container"></div>

    <a
      v-for="button of (loadedMessengersData.buttons || [])"
      class="messenger-button"
      :href="button.url"
      target="_blank"
      v-bs.tooltip="{title: $trans('chat.write-to.' + button.messenger), placement: 'left', container: '.messengers-block-tooltip-container'}"
    >
      <i class="icon-2x" :class="button.icon"></i>
    </a>

    <a
      v-if="loadedMessengersData.callMe"
      class="messenger-button call-me"
      href="#"
      v-bs.tooltip="{title: $trans('call-me.tooltip'), placement: 'left', container: '.messengers-block-tooltip-container'}"
      @click.prevent="$emit('call-me')"
    >
      <i class="icon-2x icon-line2-call-in"></i>
    </a>

    <a
      class="messenger-button messenger-button-chat"
      href="#"
      v-bs.tooltip="{title: $trans('chat.write-us'), placement: 'left', container: '.messengers-block-tooltip-container'}"
      @click.prevent="$emit('chat')"
    >
      <i class="icon-2x icon-chat"></i>
      <div v-if="chatTicket?.unreadMessagesCount" class="chat-block-new-count badge" style="display: block;">
        {{ chatTicket?.unreadMessagesCount || '' }}
      </div>
    </a>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: ['loadedMessengersData'],
  computed: {
    ...mapState('chat', {chatTicket: 'ticket'}),
  },
  mounted() {
    $(this.$el).on('click', '.messenger-button', event => {
      $(event.currentTarget).blur();
    });
  },
}
</script>
