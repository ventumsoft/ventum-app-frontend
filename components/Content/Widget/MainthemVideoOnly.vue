<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemVideoOnly">
    <div class="fancy-title title-border title-center">
      <h3 v-html="title"></h3>
    </div>
    <div class="block-video">
      <a :href="video" data-lightbox="iframe">
        <img
          :src="image || '/images/no-image.png'"
          :alt="title"
        >
        <span class="i-overlay"><img src="/images/icons/play.png" alt="Play"></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    video: {type: String},
    image: {type: String},
  },
}
</script>
