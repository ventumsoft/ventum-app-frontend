<template>
  <div v-if="buttons?.length && url && title" class="si-share clearfix topmargin-sm">
    <span>{{ label }}</span>
    <div>
      <ShareNetwork
        v-for="iteratedButton of ['facebook', 'twitter', 'vk', 'email', 'linkedin', 'pinterest', 'reddit', 'telegramMe']"
        :key="iteratedButton"
        v-if="buttons.includes(iteratedButton)"
        class="social-icon si-borderless social-share-link"
        :class="classByButton[iteratedButton]"
        v-bind="{network: networkByButton[iteratedButton] || iteratedButton, url, title}"
      >
        <i :class="iconByButton[iteratedButton]"></i>
        <i :class="iconByButton[iteratedButton]"></i>
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {type: String},
    url: {type: String},
    title: {type: String},
  },
  data: () => ({
    networkByButton: {
      telegramMe: 'telegram',
    },
    classByButton: {
      facebook: 'si-facebook',
      twitter: 'si-twitter',
      vk: 'si-pinterest',
      email: 'si-email3',
      linkedin: 'si-linkedin',
      pinterest: 'si-pinterest',
      reddit: 'si-reddit',
      telegramMe: 'si-telegram',
    },
    iconByButton: {
      facebook: 'icon-facebook',
      twitter: 'icon-twitter',
      vk: 'icon-vk',
      email: 'icon-email3',
      linkedin: 'icon-linkedin',
      pinterest: 'icon-pinterest',
      reddit: 'icon-reddit',
      telegramMe: 'icon-line2-paper-plane',
    },
  }),
  computed: {
    buttons() {
      return this.$store.state.site.settings?.['seo-integration:share:buttons'];
    },
  },
}
</script>
