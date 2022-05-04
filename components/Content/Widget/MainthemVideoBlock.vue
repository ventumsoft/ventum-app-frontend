<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60 " data-widget="MainthemVideoBlock">
    <div class="heading-block visible-xs">
      <h3 v-html="title"></h3>
      <span v-html="subtitle"></span>
    </div>
    <div class="col_two_fifth nobottommargin block-video">
      <a :href="video" data-lightbox="iframe">
        <img
          :src="image || '/images/no-image.png'"
          :alt="title"
        >
        <span class="i-overlay"><img src="/images/icons/play.png" alt="Play"></span>
      </a>
    </div>
    <div class="col_three_fifth nobottommargin col_last">
      <div class="heading-block hidden-xs">
        <h3 v-html="title"></h3>
        <span v-html="subtitle"></span>
      </div>
      <p v-html="content"></p>
      <div class="col_half nobottommargin">
        <ul class="iconlist iconlist-color nobottommargin">
          <li v-for="phrase in phrases.filter((phrase, index) => index % 2 === 0)"><i class="icon-caret-right"></i>{{ phrase }}</li>
        </ul>
      </div>
      <div class="col_half nobottommargin col_last">
        <ul class="iconlist iconlist-color nobottommargin">
          <li v-for="phrase in phrases.filter((phrase, index) => index % 2 === 1)"><i class="icon-caret-right"></i>{{ phrase }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    subtitle: {type: String},
    content: {type: String},
    video: {type: String},
    image: {type: String},
    phrases: {type: Array},
  },
}
</script>
