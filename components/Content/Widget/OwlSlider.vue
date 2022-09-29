<template>
  <section
    v-if="items?.length"
    id="owl-carousel-widget"
    class="showcase-widget container main-home-slider owl-carousel owl-theme owl-loaded clearfix prevent-transition"
    data-widget="MainthemOwlSlider"
    v-owl-carousel="{
      margin: 10,
      autoplayTimeout: this.slide_time || 100000000,
      autoplay: true,
      dots: true,
      video: true,
      videoWidth: 780,
      lazyLoad: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      lazyLoadEager: 1,
      responsive: {0: {items: 1}},
      onInitialized: carouselInitialized,
      onTranslated: carouselPlayVideo,
      onChanged: carouselChanged,
    }"
  >
    <div
      v-for="(item, index) of items"
      class="item-content"
      :data-time="item.slide_time"
    >
      <div class="main-home-slider-image-col">
        <div>
          <div v-if="item.video || item.videoWebm" class="video-wrap" style="font-size: 0">
            <video :poster="item.image || '/images/no-image.png'" preload="auto" loop muted autoplay>
              <source v-if="item.video" :src="item.video" type="video/mp4">
              <source v-if="item.videoWebm" :src="item.videoWebm" type="video/webm">
            </video>
          </div>
          <img
            v-else-if="item.image && !item.videoLink"
            class="owl-lazy"
            :data-src="item.image || '/images/no-image.png'"
            :data-src-retina="item.image2x"
            :alt="item.text"
          >
          <a
            v-else-if="item.videoLink"
            class="owl-video"
            :data-src="item.image || '/images/slider-video-background.jpg'"
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
  methods: {
    carouselPlayVideo(event) {
      for (const video of [...event.currentTarget.querySelectorAll('.owl-item:not(.active) video')]) {
        video.pause;
      }
      $(event.currentTarget).find('.owl-item').eq(event.item.index).find('video')?.[0]?.play();
      $(event.currentTarget).find('.owl-item:not(.active) iframe').each(function(i) {
        const $this = $(this);
        var videoURL = $this.attr('src');
        videoURL = videoURL.replace("autoplay=1", "autoplay=0");
        $this.prop('src', videoURL);
      });
    },
    carouselInitialized(event){
      const $owlCarousel = $(event.currentTarget);

      $owlCarousel.addClass('showcase-widget-owl-slider-loaded');

      $owlCarousel.find('.owl-video-wrapper').each(function(i){
        let that = $(this);
        let image = $(this).find('.owl-video').data('src');
        if (image) {
          that.find('.owl-video-tn').attr('style', 'background-image:url('+ image+')');
        }
      });
      $owlCarousel.find('video').each(function(i){
        let currentVideo = $(this);
        let currentVideoSource = currentVideo.find('source');
        if ( currentVideoSource.has('owl-lazy')) {
          var currentVideoSrc = currentVideoSource.attr('data-src');
          currentVideoSource.removeClass('owl-lazy');
          currentVideoSource.attr('src', currentVideoSrc);
          currentVideo[0].load();
        }
      });

      var current = event.item.index;
      var currentSlide = $(event.target).find('.owl-item').eq(current);
      this.setTimeSlide($owlCarousel, currentSlide);

      setTimeout(() => {
        $owlCarousel.removeClass('prevent-transition');
      }, 1000);
    },
    setTimeSlide($owlCarousel, currentSlide) {
      const time = this.slide_time;
      $owlCarousel.trigger('stop.owl.autoplay');
      setTimeout(function() {$owlCarousel.trigger('play.owl.autoplay')}, (time > 0) ? time : 100000000)
    },
    carouselChanged(event) {
      const $owlCarousel = $(this.$el);
      const $currentSlide = $(event.target).find('.owl-item').eq(event.item.index);
      this.setTimeSlide($owlCarousel, $currentSlide);
      if (event.page.index === 0) {
        const $cloned = $owlCarousel.find('.owl-item:not(.cloned):last').next('.cloned');
        setTimeout(() => void $cloned.addClass('active'), 10);
        $owlCarousel.find('.owl-item.cloned').filter(function () { return !$cloned.is(this); }).removeClass('active');
      } else if (event.page.index === event.page.count - 1) {
        const $cloned = $owlCarousel.find('.owl-item:not(.cloned):first').prev('.cloned');
        setTimeout(() => void $cloned.addClass('active'), 10);
        $owlCarousel.find('.owl-item.cloned').filter(function () { return !$cloned.is(this); }).removeClass('active');
      } else {
        $owlCarousel.find('.owl-item.cloned').removeClass('active');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .item-content:not(:first-child) {
    display: none;
  }
</style>
