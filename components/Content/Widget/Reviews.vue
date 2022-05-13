<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemReviews">
    <div class="clear"></div>
    <div class="fancy-title title-border title-center">
      <h3 v-html="title"></h3>
    </div>
    <ul ref="testimonialsGrid" class="testimonials-grid clearfix">
      <li v-for="review of reviews">
        <div class="testimonial">
          <div v-if="review.avatar" class="testi-image">
            <img
              :src="review.avatar || '/images/placeholder.jpg'"
              :alt="$trans('widgets.clients_reviews.alt_reviews')"
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
                  :class="{'icon-star3': ratingStar.icon === 'icon-star-full2', 'icon-star-empty': ratingStar.icon !== 'icon-star-full2'}"
                ></i>
                <span class="review-date content-date" style="padding-left: 0;">{{ review.created_at }}</span>
              </div>
              <span v-html="review.company_position_etc"></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-if="$store.state.site.settings?.['seo-integration:google-shopping-reviews:enabled'] && $store.state.site.settings?.['seo-integration:google-shopping-reviews:show-badge'] && ($store.state.site.settings?.['seo-integration:google-shopping-reviews:badge-position'] === 'INLINE')"
      class="google-shopping-badge-container"
    >
      <g:ratingbadge merchant_id={{ $currentShowcase->config('seo-integration:google-shopping-reviews:merchant-id') }}></g:ratingbadge>
    </div>
    <span v-if="is_show_rating">
      <div class="center" itemscope itemtype="http://schema.org/AggregateRating">
        {{ $trans('widgets.clients_reviews.average_rating') }}
        <span itemscope itemprop="itemReviewed" itemtype="http://schema.org/Organization"><span itemprop="name" v-html="company"></span></span>:
        <span itemprop="ratingValue">{{ averageRating }}</span>
        {{ $trans('widgets.clients_reviews.of') }}
        <span itemprop="bestRating">5</span>
        {{ $trans('widgets.clients_reviews.based') }}
        <span itemprop="reviewCount">{{ reviews_all }}</span>
        {{ $trans('widgets.clients_reviews.reviews') }}
        <TheLink :to="'#'" class="more-link fright"><fragment v-html="$trans('widgets.clients_reviews.show_all_reviews')"></fragment></TheLink>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    company: {type: String},
    reviews: {type: Array},
    is_show_rating: {type: Boolean},
    averageRating: {type: String},
    reviews_all: {type: Number},
  },
  mounted() {
    const $testimonialsGridEl = $(this.$refs.testimonialsGrid);
    let maxHeight = 0;
    $testimonialsGridEl.find('li > .testimonial').each(function () {
      maxHeight = Math.max(maxHeight, $(this).height());
    });
    $testimonialsGridEl.find('li').height(maxHeight);
  },
}
</script>
