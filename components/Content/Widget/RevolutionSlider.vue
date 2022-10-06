<template>
  <section
    id="slider"
    class="showcase-widget slider-parallax revslider-wrap ohidden clearfix"
    data-widget="MainthemRevolutionSlider"
    v-html="slider_code"
  ></section>
</template>

<script>
export default {
  props: {
    slider_code: {type: String},
    slider_styles: {type: String},
  },
  head() {
    return {
      link: [
        {rel: 'stylesheet', href: '/vendor/rs-plugin/css/settings.css', media: 'screen'},
        {rel: 'stylesheet', href: '/vendor/rs-plugin/css/layers.css'},
        {rel: 'stylesheet', href: '/vendor/rs-plugin/css/navigation.css'},
      ],
      style: [
        {innerHTML: this.slider_styles},
      ],
      script: [
        !$?.fn?.revolution && {src: '/vendor/rs-plugin/js/jquery.themepunch.tools.min.js', body: true, defer: true, callback: () => this.initialize()},
        !$?.fn?.revolution && {src: '/vendor/rs-plugin/js/jquery.themepunch.revolution.min.js', body: true, defer: true, callback: () => this.initialize()},
      ].filter(v => v),
      __dangerouslyDisableSanitizers: ['style'],
    }
  },
  mounted() {
    $(() => {
      $(document).ready(() => {
        this.initialize();
      });
    });
  },
  methods: {
    initialize() {
      if (this.$revolution || !$.fn.revolution) {
        return;
      }
      this.$revolution = $(this.$el).find('.tp-banner').show().revolution({
        sliderType: 'standard',
        jsFileLocation: '/vendor/rs-plugin/js/',
        sliderLayout: 'fullwidth',
        dottedOverlay: 'none',
        delay: 9000,
        responsiveLevels: [1200, 992, 768, 480, 320],
        gridwidth: 1140,
        gridheight: 500,
        lazyType: 'none',
        shadow: 0,
        spinner: 'off',
        autoHeight: 'off',
        disableProgressBar: 'off',
        hideThumbsOnMobile: 'off',
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: false,
        fallbacks: {
          simplifyAll: 'off',
          disableFocusListener: false,
        },
        navigation: {
          keyboardNavigation: 'off',
          keyboard_direction: 'horizontal',
          mouseScrollNavigation: 'off',
          onHoverStop: 'off',
          touch: {
            touchenabled: 'on',
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: 'horizontal',
            drag_block_vertical: false,
          },
          arrows: {
            enable: false,
            left: {},
          },
          bullets: {
            enable: true,
            style: 'persephone',
            tmp: '',
            direction: 'horizontal',
            rtl: false,
            container: 'slider',
            h_align: 'right',
            v_align: 'bottom',
            h_offset: 50,
            v_offset: 20,
            space: 5,
            hide_onleave: false,
            hide_onmobile: true,
            hide_under: 0,
            hide_over: 9999,
            hide_delay: 200,
            hide_delay_mobile: 1200,
          },
        },
      });
    },
  },
  beforeDestroy() {
    this.$revolution?.revkill();
  },
}
</script>
