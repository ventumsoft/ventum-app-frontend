<template>
  <div v-if="reviews?.length">
    <div class="showcase-widget section last-no-margin" data-widget="MainthemReviewsSlider">
      <h3 class="uppercase center nobottommargin" v-html="title"></h3>
      <span v-if="is_show_rating">
        <div style="margin-top: 10px" class="center bottommargin-sm" id="product-rating" itemscope itemtype="http://schema.org/AggregateRating">
          site/widgets.clients_reviews.average_rating
          <span itemscope itemprop="itemReviewed" itemtype="http://schema.org/Organization"><span itemprop="name" v-html="company"></span></span>:
          <span itemprop="ratingValue">{{ averageRating }}</span>
          site/widgets.clients_reviews.of
          <span itemprop="bestRating">5</span>
          site/widgets.clients_reviews.based
          <span itemprop="reviewCount">{{ reviews_all }}</span>
          site/widgets.clients_reviews.reviews
          <TheLink :to="'#'" class="more-link">site/widgets.clients_reviews.show_all_reviews</TheLink>
        </div>
      </span>
      <div class="fslider testimonial" data-animation="fade" slideshowspeed="10000" data-arrows="false">
        <div ref="flexslider" class="flexslider">
          <div class="slider-wrap">
            <div v-for="review of reviews" class="slide">
              <div v-if="review.avatar" class="testi-image">
                <img
                  :src="review.avatar || '/images/placeholder.jpg'"
                  alt="site/widgets.clients_reviews.alt_reviews"
                  loading="lazy"
                  style="object-fit: cover"
                >
              </div>
              <div class="testi-content">
                <p v-html="review.review"></p>
                <div class="testi-meta">
                  {{ review.customer_name }}
                  <div class="product-rating" style="float: right;">
                    <i
                      v-for="ratingStar of review.ratingStars"
                      class="text-size-base text-success"
                      :class="(ratingStar.icon === 'icon-star-full2') ? 'icon-star3' : 'icon-star-empty'"
                    ></i>
                    <span class="review-date content-date" style="padding-left: 0;">{{ review.created_at }}</span>
                  </div>
                  <span v-html="review.company_position_etc"></span>
                </div>
              </div>
              <div
                v-if="review.reply"
                class="testi-reply"
                v-html="review.reply"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    title: {type: String},
    company: {type: String},
    reviews: {type: Array},
    is_show_rating: {type: Boolean},
    averageRating: {type: String},
    reviews_all: {type: Number},
  },
  async mounted() {
    if (!this.reviews?.length) {
      return;
    }
    if (!$.fn.flexslider) {
      await import('flexslider/jquery.flexslider');
    }
    const $flexslider = $(this.$refs.flexslider);
    $flexslider.flexslider({
      selector: ".slider-wrap > .slide",
      animation: 'fade',
      easing: 'swing',
      direction: 'horizontal',
      slideshow: true,
      slideshowSpeed: 10000,
      animationSpeed: 600,
      pauseOnHover: true,
      video: false,
      controlNav: true,
      directionNav: false,
      smoothHeight: false,
      useCSS: true,
      start: function (slider) {
        slider.parent().removeClass('preloader2');
        $('.flex-prev').html('<i class="icon-angle-left"></i>');
        $('.flex-next').html('<i class="icon-angle-right"></i>');
      },
      after: function () {},
    });
  },
}
</script>
