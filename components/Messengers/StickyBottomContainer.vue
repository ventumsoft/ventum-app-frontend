<template>
  <div class="container-sticky-bottom">
    <div
      v-if="!loadedMessengersData.chat && loadedMessengersData.callMe"
      id="call-me"
      :title="$trans('call-me.tooltip')"
    >
      <a class="call-me" href="#" @click.prevent="$emit('call-me')">
        <i class="icon-2x icon-line2-call-in"></i>
      </a>
    </div>
    <div
      v-if="loadedMessengersData.chat"
      id="chat"
      class="chat-desktop chat-block collapse"
      :class="{'has-messengers-block': loadedMessengersData.buttons || loadedMessengersData.callMe}"
    >
      <div class="chat-block-closed">
        <div class="chat-block-closed-button">
          <i class="icon-chat-3" :data-icons="JSON.stringify(['icon-chat', 'icon-chat-1', 'icon-chat-2', 'icon-chat-3'])"></i>
          <i v-if="loadedMessengersData.buttons || loadedMessengersData.callMe" class="icon-line-cross hover"></i>
          <div v-show="chatTicketUnreadMessages" class="chat-block-new-count badge">{{ chatTicketUnreadMessages || '' }}</div>
        </div>
        <MessengersMenu
          v-if="loadedMessengersData.buttons || loadedMessengersData.callMe"
          :loadedMessengersData="loadedMessengersData"
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
              <span class="nocolor helpdesk-ticket-timefromlastreply">---</span>
            </span>
            <span class="nocolor chat-block-offline">
              {{ $store.state.site.settings?.['helpdesk:chat-welcome-offline'] || $trans('chat.leaveyourmessage') }}
            </span>
            <i
              class="chat-close icon-line-cross pull-right"
              style="font-size:16px;"
              role="button"
              data-toggle="collapse"
              data-target=".chat-block"
            ></i>
            <span class="nocolor chat-block-volume pull-right" data-state="on" style="margin-right: 15px;">
              <i class="icon-line2-volume-2 chat-block-volume-on"></i>
              <i class="icon-line2-volume-off chat-block-volume-off"></i>
            </span>
          </h5>
        </div>
        <div class="panel-body">
          <div class="chat-block-online">
            Chat block online panel body
          </div>
          <div class="chat-block-offline">
            Chat block offline panel body
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'loadedMessengersData',
  ],
  data: () => ({
    showMessengersButtons: false,
    chatTicketUnreadMessages: 0,
  }),
}
</script>
