<template>
  <Fragment>
    <PageTitle
      :title="$trans('reviews.page_title')"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
        {title: $trans('reviews.page_title')},
      ]"
    />
    <section id="content">
      <div class="content-wrap" style="min-height: 125px;">
        <div class="container clearfix">
          <div id="reviews-timeline" class="post-grid grid-container post-masonry post-timeline grid-2 clearfix" style="position: relative;">
            <div class="timeline-border"></div>

            <div class="entry entry-date-section notopmargin" style="float: none; margin-bottom: 25px;">
              <span>
                <button
                  class="button btn-success nomargin fright add-review-button"
                  @click="$auth.loggedIn ? (isShowingReviewModal = true) : $store.commit('site/setShowingLoginModal', true)"
                >
                  {{ $trans('reviews.leave_review') }}
                </button>
              </span>
            </div>

            <TheIsotope
              v-if="reviews?.length"
              :list="reviews"
              :options="{itemSelector: '.entry', masonry: {columnWidth: '.entry:not(.entry-date-section)'}}"
            >
              <div
                ref="entries"
                v-for="(review, index) of reviews"
                :key="review.id"
                class="entry entry_guestbook clearfix"
                :class="{'site-review-scroll-to': void '$review->id == Request::input(\'toReviewId\')'}"
              >
                <div class="entry-timeline" :style="{top: (index === 0) && '70px' || ''}"><div class="timeline-divider"></div></div>

                <div class="testimonial testimonial_guestbook" style="overflow: hidden;">
                  <div v-if="review.avatar" class="testi-image">
                    <img
                      style="object-fit: cover"
                      :src="review.avatar"
                      :alt="review.customer_name"
                    >
                  </div>
                  <div class="testi-content">
                    <p v-html="$nl2br(review.review)"></p>

                    <div class="testi-meta">
                      {{ review.customer_name }}
                      <div class="product-rating" style="float: right;">
                        <i
                          v-for="ratingStar of review.ratingStars"
                          :class="(ratingStar.icon === 'icon-star-full2') ? 'icon-star3' : 'icon-star-empty'"
                        ></i>
                        <span class="content-date">{{ $dt(review.created_at, 'date') }}</span>
                      </div>
                      <span class="product-rating-info" v-html="$nl2br(review.company_position_etc) || '&nbsp;'"></span>
                      <div class="clearfix"></div>
                    </div>
                    <div v-if="review.reply" class="testi-reply" v-html="$nl2br(review.reply)"></div>
                  </div>
                </div>
              </div>
            </TheIsotope>
          </div>

          <div v-if="page < pages" id="load-next-posts" class="center timeline-link">
            <a
              class="button btn-success button-large timeline-add"
              @click.prevent="$store.dispatch('reviews/fetch', {page: page + 1, append: true});"
            >
              <div v-if="loading" class="form-process" style="left: 0;"></div>
              {{ $trans('blog.look_yet') }}
            </a>
          </div>

          <div class="center pagination-block">
            <ThePagination
              :pagesCount="pages"
              :currentPage="page"
              :routeBuilder="page => $page({name: 'reviews', query: {page}})"
            />
          </div>

          <div v-if="reviews?.length" class="center" itemscope itemtype="http://schema.org/AggregateRating" style="margin-top: 20px;margin-bottom: 20px;">
            <div class="hidden" itemscope itemprop="itemReviewed" itemtype="http://schema.org/Organization"><meta itemprop="name" :content="$store.state.site.settings?.['general:display-site-name']"></div>
            <meta itemprop="ratingValue" :content="averageRating">
            <meta itemprop="bestRating" content="5">
            <meta itemprop="reviewCount" :content="count">
            <template v-html="$trans('reviews.aggregate_rating', {
              siteName: $store.state.site.settings?.['general:display-site-name'],
              ratingValue: averageRating,
              reviewsCount: count,
            })"></template>
          </div>
        </div>
      </div>
    </section>
    <ReviewsAddModal
      v-if="isShowingReviewModal"
      @closed="isShowingReviewModal = false"
    />
  </Fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  head() {
    return {
      title: this.$trans('reviews.title') + ((this.page > 1) ? (' ' + this.$trans('reviews.page').replace(':number', this.page)) : ''),
      meta: [
        {name: 'description', content: this.$trans('reviews.meta-description') + ((this.page > 1) ? (' ' + this.$trans('reviews.page').replace(':number', this.page)) : '')},
        {property: 'og:type', content: 'article'},
        {property: 'og:title', content: this.$trans('reviews.title') + ((this.page > 1) ? (' ' + this.$trans('reviews.page').replace(':number', this.page)) : '')},
        {property: 'og:description', content: this.$trans('reviews.meta-description') + ((this.page > 1) ? (' ' + this.$trans('reviews.page').replace(':number', this.page)) : '')},
        {property: 'og:url', content: this.$router.resolve(this.$page({name: 'reviews', query: {page: this.$route.query.page}})).href},
        {property: 'og:image', content: this.$store.state.site.settings?.['logo_og'] || '/images/no-image.png'},
      ],
    };
  },
  data: () => ({
    isShowingReviewModal: false,
  }),
  computed: {
    ...mapState('reviews', [
      'loading',
      'page',
      'pages',
      'reviews',
      'count',
      'averageRating',
    ]),
  },
  async asyncData({store, route}) {
    await store.dispatch('reviews/fetch', {page: Number(route.query.page) || 1});
  },
  watchQuery: true,
}
</script>
