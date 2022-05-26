<template>
  <div class="col_two_third portfolio-single-image nobottommargin product-images-block">
    <div class="sale-flash-container" style="z-index: 3;">
      <div v-if="product.info?.is_new" class="sale-flash new">{{ $trans('product.new') }}!</div>
      <div v-if="product.info?.discount" class="sale-flash">{{ $trans('product.discount') }} - {{ product.info.discount * 1 }}%</div>
      <div v-if="product.info?.totalDiscountLabel" class="sale-flash">- {{ product.info.totalDiscountLabel }}</div>
    </div>
    <div class="fslider product-images-slider">
      <div ref="flexslider" class="flexslider">
        <div class="slider-wrap">
          <div
            v-for="(image, index) of ((product.images?.length) ? product.images : [null])"
            class="slide"
            :id="(index === 0) ? 'product-picture' : null"
            :data-product-image-id="image?.id"
            :data-thumb="image?.thumb || '/images/placeholder.jpg'"
          >
            <div class="product-images-slider-image-container">
              <div class="product-slider-image-subcontainer">
                <a href="#" @click.prevent>
                  <img
                    :src="image?.link || '/images/placeholder.jpg'"
                    :srcset="image?.link && image?.link2x ? (image.link + ', ' + image.link2x + ' 2x') : null"
                    :loading="(index !== 0) ? 'lazy' : null"
                    :alt="product.title"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['product']),
  },
  async mounted() {
    await this.initFlexSlider();
  },
  watch: {
    async product() {
      await this.initFlexSlider();
    },
  },
  methods: {
    async initFlexSlider() {
      await import('flexslider/jquery.flexslider');
      const $flexslider = $(this.$refs.flexslider);
      const enableSlideShow = Boolean(this.product.isImagesSliderEnabled);
      $flexslider.flexslider({
        selector: '.slider-wrap > .slide',
        animation: 'fade',
        easing: 'swing',
        direction: 'horizontal',
        slideshow: enableSlideShow,
        slideshowSpeed: 5000,
        animationSpeed: 600,
        pauseOnHover: true,
        video: false,
        controlNav: 'thumbnails',
        directionNav: enableSlideShow,
        smoothHeight: false,
        useCSS: true,
        start: function (slider) {
          slider.parent().removeClass('preloader2');
          $flexslider.find('.flex-prev').html('<i class="icon-angle-left"></i>');
          $flexslider.find('.flex-next').html('<i class="icon-angle-right"></i>');
          $flexslider.find('.flex-direction-nav').toggle(enableSlideShow);
        },
        after: function () {},
      });
    },
  },
}
</script>
