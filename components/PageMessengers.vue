<template>
  <fragment v-if="loadedMessengersData">
    <MessengersCallMeModal
      v-if="loadedMessengersData.callMe && isShowingCallMeModal"
      @closed="isShowingCallMeModal = false"
    />
    <MessengersStickyBottomContainer
      :loadedMessengersData="loadedMessengersData"
      @call-me="isShowingCallMeModal = true"
    />
  </fragment>
</template>

<script>
export default {
  data: () => ({
    isShowingCallMeModal: false,
    loadedMessengersData: null,
  }),
  async mounted() {
    const {onPageLoadedAndInteracted} = await import('@/plugins/load-interacted.client.js');
    await new Promise(resolve => onPageLoadedAndInteracted(event => resolve()));

    ({data: this.loadedMessengersData} = await this.$axios('communications/load-messengers'));

    this.$store.commit('chat/update', {
      ticket: this.loadedMessengersData.chat?.ticket,
      messageAudio: new Audio(this.loadedMessengersData.chat?.messageAudio || '/sounds/chat-message.mp3'),
      messageAudioEnabled: (typeof localStorage !== 'undefined') && (localStorage.messageAudioEnabled !== undefined) ?
        (localStorage.messageAudioEnabled === 'true') :
        true,
    });
  },
}
</script>
