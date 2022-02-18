<template>
  <section
    id="owl-carousel-widget"
    class="showcase-widget container main-home-slider owl-carousel owl-theme owl-loaded clearfix prevent-transition"
    data-widget="MainthemOwlSlider"
    :data-slide-time="slide_time"
    :style="{visibility: 'visible'}"
  >
    <div
      v-for="(item, index) of items"
      class="item-content"
      :data-time="item.slide_time"
    >
      <div class="main-home-slider-image-col">
        <div>
          <div v-if="item.video || item.videoWebm" class="video-wrap" style="font-size: 0">
            <video :poster="item.image || '/images/no_image.png'" preload="auto" loop muted autoplay>
              <source v-if="item.video" :src="item.video" type="video/mp4">
              <source v-if="item.videoWebm" :src="item.videoWebm" type="video/webm">
            </video>
          </div>
          <img
            v-else-if="item.image && !item.videoLink"
            class="owl-lazy"
            :data-src="item.image || '/images/no_image.png'"
            :data-src-retina="item.image2x"
            :alt="item.text"
          >
          <a
            v-else-if="item.videoLink && item.image"
            class="owl-video"
            :data-src="item.image || '/images/no_image.png'"
            :href="item.videoLink"
          ></a>
          <a
            v-else-if="item.videoLink"
            class="owl-video"
            data-src="/images/site/slider_video_background.jpg"
            :href="item.videoLink"
          ></a>
        </div>
      </div>
      <div class="main-home-slider-text-col">
        <div class="main-home-slider-box d-flex flex-column" :class="{'wo-button': !item.button || !item.link}">
          <h1 v-if="index === 0" class="main-home-slider-title" v-html="item.text"></h1>
          <h3 v-else class="main-home-slider-title" v-html="item.text"></h3>
          <a
            v-if="item.button && item.link"
            class="button button-rounded"
            :href="item.link"
          >
            {{ item.button }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    slide_time: {type: Number},
    items: {type: Array},
  },
}
</script>

<style lang="scss" scoped>
  .item-content:not(:first-child) {
    display: none;
  }
</style>
