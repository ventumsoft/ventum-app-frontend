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
    onPageLoadedAndInteracted(async event => {
      ({data: this.loadedMessengersData} = await this.$axios('communications/load-messengers'));
    });
  },
}
</script>
