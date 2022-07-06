<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60"
       data-widget="MainthemPopularTemplates">
    <div class="fancy-title title-border title-center bottommargin">
      <h3 v-html="title"></h3>
    </div>
    <div ref="carousel" class="owl-carousel portfolio-carousel">
      <div v-for="(templateData, templateIndex) of templatesData" class="oc-item">
        <div class="iportfolio">
          <div class="portfolio-image">
            <TheLink :to="$page({name: 'template/id', params: {id: templateData.id}})">
              <img
                v-if="(templateIndex < 2) || (templateIndex === templatesData.length - 1)"
                :src="templateData.previewImage"
                :srcset="templateData.previewImage + ', ' + templateData.previewImage2x + ' 2x'"
                :alt="templateData.title"
                loading="lazy"
              >
              <img
                v-else
                :data-src="templateData.previewImage"
                :data-src-retina="templateData.previewImage2x"
                :alt="templateData.title"
                class="owl-lazy"
                loading="lazy"
              >
            </TheLink>
            <div class="portfolio-overlay" :data-lightbox="templateData.pagesImagesUrls ? 'gallery' : undefined">
              <template v-if="templateData.pagesImagesUrls">
                <a
                  v-for="(templatePageImageUrl, index) of templateData.pagesImagesUrls"
                  :href="templatePageImageUrl"
                  :class="(index === 0) ? 'center-icon' : 'hidden'"
                  data-lightbox="gallery-item"
                >
                  <i v-if="index === 0" class="icon-line-plus"></i>
                </a>
              </template>
              <a v-else :href="templateData.previewImageFull" class="center-icon" v-mfp:image>
                <i class="icon-line-plus"></i>
              </a>
            </div>
          </div>
          <div class="portfolio-desc">
            <h3>
              <TheLink :to="$page({name: 'template/id', params: {id: templateData.id}})">
                {{ templateData.title }}
              </TheLink>
            </h3>
            <div v-if="templatesProductsMap?.[templateData.id]" class="tagcloud">
              <TheLink
                v-for="(templateCategoryData, index) of templateData.categories"
                :key="index"
                :to="$page({name: 'slug/templates', params: {slug: templateData.productSlug}, query: {categoryId: templateCategoryData.id}})"
              >
                {{ templateCategoryData.title }}
              </TheLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    templatesData: {type: Array},
    templatesProductsMap: {type: Object},
  },
  async mounted() {
    await import('owl.carousel/dist/owl.carousel');

    const $carousel = $(this.$refs.carousel);
    $carousel.owlCarousel({
      margin: 2,
      nav: true,
      navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
      autoplay: false,
      autoplayHoverPause: true,
      dots: false,
      loop: (this.templatesData?.length > 2) ? 1 : 0,
      lazyLoad: true,
      lazyLoadEager: 3,
      responsive: {
        0: {items: 1},
        400: {items: 2},
        800: {items: 3},
        1200: {items: 4},
      },
      onInitialized: this.carouselInitialized,
    });
  },
  methods: {
    carouselInitialized(event) {
      const $carousel = $(this.$refs.carousel);
      $carousel.find('[data-lightbox="gallery"]').each(function () {
        let element = $(this);
        element.magnificPopup({
          type: 'image',
          delegate: 'a[data-lightbox="gallery-item"]',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-fade',
          image: {verticalFit: true},
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
          },
        });
      });
    },
  },
}
</script>
