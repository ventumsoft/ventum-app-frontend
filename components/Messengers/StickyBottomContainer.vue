<template>
  <div class="container-sticky-bottom">
    <div
      v-if="!loadedMessengersData.chat && loadedMessengersData.callMe"
      id="call-me"
      v-bs.tooltip="{title: $trans('call-me.tooltip')}"
    >
      <a class="call-me" href="#" @click.prevent="$emit('call-me')">
        <i class="icon-2x icon-line2-call-in"></i>
      </a>
    </div>
    <div
      ref="chat"
      v-if="loadedMessengersData.chat"
      id="chat"
      class="chat-desktop chat-block collapse"
      :class="{
        'has-messengers-block': existsMessengersBlock,
        'has-messengers-block-visible': showingMessengersBlock,
      }"
      :data-chat-block-mode="chatMode"
    >
      <div class="chat-block-closed">
        <div class="chat-block-closed-button" @click="handleChatBlockClosedButton">
          <i :class="chatBlockClosedButtonIcons[chatBlockClosedButtonIconIndex]"></i>
          <i v-if="existsMessengersBlock" class="icon-line-cross hover"></i>
          <div v-if="chatTicket?.unreadMessagesCount" class="chat-block-new-count badge" style="display: block;">
            {{ chatTicket?.unreadMessagesCount || '' }}
          </div>
        </div>
        <MessengersMenu
          v-if="existsMessengersBlock"
          :loadedMessengersData="loadedMessengersData"
          @call-me="$emit('call-me')"
          @chat="showChat()"
        />
      </div>
      <div class="panel panel-default chat-block-opened">
        <div class="panel-heading">
          <h5 class="panel-title">
            <span class="nocolor chat-block-pending">
              <i class="icon-chat position-left"></i> {{ $trans('chat.chat') }}
            </span>
            <span class="nocolor chat-block-online">
              <i class="icon-line-clock position-left"></i>
              <MessengersChatTimeFromLastReply :seconds="chatTicket?.secondsFromLastReply" />
            </span>
            <span class="nocolor chat-block-offline">
              {{ $store.state.site.settings?.['helpdesk:chat-welcome-offline'] || $trans('chat.leaveyourmessage') }}
            </span>
            <i
              class="chat-close icon-line-cross pull-right"
              style="font-size:16px;"
              role="button"
              @click="hideChat"
            ></i>
            <span
              class="nocolor chat-block-volume pull-right"
              style="margin-right: 15px;"
              :data-state="chatMessageAudioEnabled ? 'on' : 'off'"
              @click="$store.commit('chat/update', {messageAudioEnabled: !chatMessageAudioEnabled})"
            >
              <i v-if="chatMessageAudioEnabled" class="icon-line2-volume-2 chat-block-volume-on"></i>
              <i v-else class="icon-line2-volume-off chat-block-volume-off"></i>
            </span>
          </h5>
        </div>
        <div class="panel-body">
          <div v-if="chatMode === 'online'" class="chat-block-online">
            <MessengersChatMessages
              :ticket="chatTicket"
              :welcome="chatWelcome"
            />
            <MessengersChatForm />
          </div>
          <MessengersChatOffline v-else-if="chatMode === 'offline'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: [
    'loadedMessengersData',
  ],
  data: () => ({
    chatBlockClosedButtonIcons: ['icon-chat', 'icon-chat-1', 'icon-chat-2', 'icon-chat-3'],
    chatBlockClosedButtonIconIndex: 3,
    showingMessengersBlock: false,
    chatOpening: false,
  }),
  computed: {
    ...mapState('chat', {
      chatMode: 'mode',
      chatTicket: 'ticket',
      chatWelcome: 'welcome',
      chatMessageAudioEnabled: 'messageAudioEnabled',
    }),
    existsMessengersBlock() {
      return this.loadedMessengersData.buttons || this.loadedMessengersData.callMe;
    },
  },
  mounted() {
    setInterval(() => {
      this.chatBlockClosedButtonIconIndex = (this.chatBlockClosedButtonIconIndex + 1) % this.chatBlockClosedButtonIcons.length;
    }, 1000);
    $(this.$el).on('show.bs.tooltip', '.chat-block-closed', event => {
      if ($(window).width() <= 768) {
        return false;
      }
    });
    $(window).on('resize', event => {
      this.showingMessengersBlock = false;
    });
    this.listenChatEchoEvents();
    setInterval(() => {
      this.$store.commit('chat/increaseTicketSecondsFromLastReply');
    }, 1000);
  },
  watch: {
    '$auth.user'() {
      this.hideChat();
      this.listenChatEchoEvents();
    },
  },
  methods: {
    handleChatBlockClosedButton() {
      if (!this.existsMessengersBlock) {
        this.showChat();
      } else if ($(window).width() <= 768) {
        this.showingMessengersBlock ^= true;
      }
    },

    async showChat() {
      this.showingMessengersBlock = false;
      if (this.chatOpening) {
        return;
      }
      this.chatOpening = true;

      let mode, ticket, welcome;

      try {
        await this.$auth.getUserOrGuest();
        ({data: {mode, ticket, welcome}} = await this.$axios.get('communications/open-chat'));
      } catch (exception) {
        return;
      } finally {
        this.chatOpening = false;
      }

      this.$store.commit('chat/update', {mode, ticket, welcome});

      await this.$nextTick();

      $(this.$refs.chat).collapse('show');
    },

    hideChat() {
      $(this.$refs.chat).collapse('hide');

      this.$store.commit('chat/update', {mode: null});
    },

    listenChatEchoEvents() {
      if (!this.$auth.user) {
        return;
      }
      this.$echo.private('Api.Site.User.' + this.$auth.user.id)
        .listen('HelpDesk.TicketMessageWasBuilded', ({message}) => {
          if ((this.chatMode !== 'online') || (this.chatTicket.id !== message.ticket_id)) {
            return;
          }
          this.$store.commit('chat/message', message);
        })
        .listen('HelpDesk.TicketMessageWasUpdated', ({message}) => {
          if ((this.chatMode !== 'online') || (this.chatTicket.id !== message.ticket_id)) {
            return;
          }
          this.$store.commit('chat/message', message);
        })
        .listen('HelpDesk.TicketWasUpdated', ({ticket}) => {
          if (ticket.channel === 'chat') {
            if (this.chatMode === 'online') {
              ticket.messages = this.chatTicket.messages;
            }
            this.$store.commit('chat/update', {ticket});
          }
        })
      ;
    },
  },
}
</script>
