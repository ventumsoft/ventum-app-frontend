<template>
  <fragment>
    <PageTitle
      :title="h1"
      :breadcrumbs="template.breadcrumbs"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div class="col_half bottommargin">
            <div ref="preview" class="product-template-preview-container">
              <div class="product-template-preview-content" :data-lightbox="template.pagesImages ? 'gallery' : undefined">
                <template v-if="template.pagesImages">
                  <a
                    v-for="(templatePageImage, index) of template.pagesImages"
                    :href="templatePageImage.full"
                    :class="(index === 0) ? 'center-icon' : 'hidden'"
                    data-lightbox="gallery-item"
                  >
                    <img
                      v-if="index === 0"
                      :src="template.preview"
                      :srcset="template.preview2x && (template.preview + ', ' + template.preview2x + '2x')"
                      :alt="template.title"
                    >
                    <img
                      v-else
                      :src="templatePageImage.preview"
                      :srcset="templatePageImage.preview2x && (templatePageImage.preview + ', ' + templatePageImage.preview2x + '2x')"
                      :alt="template.title"
                    >
                  </a>
                </template>
                <TheLink
                  v-else
                  class="center-icon"
                  :to="$page({name: 'creator/creator', params: {creator: 'universal'}, query: {templateId: template.id, ...(({productId, compilationId}) => ({productId, compilationId}))($route.query)}})"
                >
                  <img
                    :src="template.preview"
                    :srcset="template.preview2x && (template.preview + ', ' + template.preview2x + '2x')"
                    :alt="template.title"
                  >
                </TheLink>
              </div>
            </div>
          </div>
          <div class="col_half portfolio-single-content col_last bottommargin">
            <div class="fancy-title title-bottom-border">
              <h2>{{ $trans('product.template.template_information') }}</h2>
            </div>
            <p>{{ template.description }}</p>
            <ul class="portfolio-meta">
              <li><span>ID:</span> {{ template.id }}</li>
              <li v-if="template.designer"><span><i class="icon-user"></i>{{ $trans('product.template.designer') }}</span> {{ template.designer }}</li>
              <li><span><i class="icon-calendar3"></i>{{ $trans('product.template.created_by') }}</span>{{ template.created_at }}</li>
              <li v-if="template.usages !== undefined"><span><i class="icon-heart3"></i>{{ $trans('product.template.used') }}</span> {{ template.usages }} {{ $trans('product.template.times') }}</li>
            </ul>
            <div v-if="template.categories?.length" class="tagcloud">
              <h5>{{ $trans('product.template.categories') }}</h5>
              <TheLink
                v-for="category of template.categories"
                :key="category.id"
                :to="$page({name: 'slug/templates', params: {slug: template.productSlug}, query: {categoryId: category.id, ...(({productId, compilationId}) => ({productId, compilationId}))($route.query)}})"
              >{{ category.title }}</TheLink>
              <div class="clear"></div>
            </div>
            <div v-if="template.tags?.length" class="tagcloud" style="margin-top: 30px;">
              <h5>{{ $trans('product.template.tags') }}</h5>
              <a v-for="tag of template.tags" href="#" @click.prevent>{{ tag }}</a>
              <div class="clear"></div>
            </div>
            <TheShare
              class="topmargin-sm"
              :label="$trans('product.template.share')"
              :url="template.url"
              :title="metaTitle"
            />
            <div class="product-price topmargin-sm" style="font-size: xx-large">
              <ins v-if="template.price">
                <span>{{ template.price }}</span>
              </ins>
              <TheLink
                class="button button-rounded fright nomargin"
                :to="$page({name: 'creator/creator', params: {creator: 'universal'}, query: {templateId: template.id, ...(({productId, compilationId}) => ({productId, compilationId}))($route.query)}})"
              >
                <span>{{ $trans('product.template.create_layout') }}</span>
                <i class="icon-angle-right"></i>
              </TheLink>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
          <div v-if="template.similar?.length" class="container clearfix">
            <div class="fancy-title title-border title-center  bottommargin">
              <h3>{{ $trans('product.template.related_templates') }}</h3>
            </div>
            <div ref="carousel" id="owl-carousel-templates" class="owl-carousel portfolio-carousel">
              <div v-for="(similarTemplate, templateIndex) of template.similar" class="oc-item">
                <div class="iportfolio">
                  <div class="portfolio-image">
                    <TheLink :to="$page({name: 'template/id', params: {id: similarTemplate.id}, query: (({productId, compilationId}) => ({productId, compilationId}))($route.query)})">
                      <img
                        v-if="(templateIndex < 2) || (templateIndex === template.similar.length - 1)"
                        :src="similarTemplate.preview"
                        :srcset="similarTemplate.preview2x && (similarTemplate.preview + ', ' + similarTemplate.preview2x + ' 2x')"
                        :alt="similarTemplate.title"
                        loading="lazy"
                      >
                      <img
                        v-else
                        :data-src="similarTemplate.preview"
                        :data-src-retina="similarTemplate.preview2x"
                        :alt="similarTemplate.title"
                        class="owl-lazy"
                        loading="lazy"
                      >
                    </TheLink>
                    <div class="portfolio-overlay" :data-lightbox="similarTemplate.pagesImages ? 'gallery' : undefined">
                      <template v-if="similarTemplate.pagesImages">
                        <a
                          v-for="(templatePageImage, index) of similarTemplate.pagesImages"
                          :href="templatePageImage.full"
                          :class="(index === 0) ? 'center-icon' : 'hidden'"
                          data-lightbox="gallery-item"
                        >
                          <i v-if="index === 0" class="icon-line-plus"></i>
                        </a>
                      </template>
                      <a v-else :href="similarTemplate.image" class="center-icon" data-lightbox="image">
                        <i class="icon-line-plus"></i>
                      </a>
                    </div>
                  </div>
                  <div class="portfolio-desc">
                    <h3>
                      <TheLink :to="$page({name: 'template/id', params: {id: similarTemplate.id}, query: (({productId, compilationId}) => ({productId, compilationId}))($route.query)})">
                        {{ similarTemplate.title }}
                      </TheLink>
                    </h3>
                    <div v-if="similarTemplate.categories?.length" class="tagcloud">
                      <TheLink
                        v-for="category of similarTemplate.categories"
                        :key="category.id"
                        :to="$page({name: 'slug/templates', params: {slug: template.productSlug}, query: {categoryId: category.id, ...(({productId, compilationId}) => ({productId, compilationId}))($route.query)}})"
                      >
                        {{ category.title }}
                      </TheLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
export default {
  async asyncData({params, $axios}) {
    try {
      const {data: template} = (await $axios.get('products/template', {
        params: {
          templateId: params.id,
        },
        showErrorPageOnException: true,
      }));
      return {template};
    } catch (exception) {
      return;
    }
  },
  head() {
    return {
      title: this.metaTitle,
      meta: [{
        name: 'description',
        content: this.metaDescription,
      }],
    };
  },
  computed: {
    metaTitle() {
      return [
        this.template.meta?.title,
        'constructor:templates:auto-add-site-name-to-meta-title' ? this.$store.state.site.settings?.['general:display-site-name'] : null,
        'constructor:templates:auto-add-template-id-to-meta-title' ? ('ID' + this.template.id) : null,
      ].filter(v => v).join(' | ');
    },
    metaDescription() {
      return [
        this.template.meta?.description,
        'constructor:templates:auto-add-site-name-to-meta-description' ? this.$store.state.site.settings?.['general:display-site-name'] : null,
        'constructor:templates:auto-add-template-id-to-meta-description' ? ('ID' + this.template.id) : null,
      ];
    },
    h1() {
      return [
        this.template.title,
        'constructor:templates:auto-add-template-id-to-meta-h1' ? ('ID' + this.template.id) : null,
      ].filter(v => v).join(' | ');
    },
  },
  async mounted() {
    await import('owl.carousel/dist/owl.carousel');
    await import('magnific-popup');

    if (this.$refs.carousel) {
      const $carousel = $(this.$refs.carousel);
      $carousel.owlCarousel({
        margin: 2,
        nav: true,
        navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
        autoplay: false,
        autoplayHoverPause: true,
        dots: false,
        loop: (this.template.similar?.length > 2) ? 1 : 0,
        lazyLoad: true,
        lazyLoadEager: 3,
        responsive: {
          0: {items: 1},
          400: {items: 2},
          800: {items: 3},
          1200: {items: 4},
        },
        onInitialized: this.carouselInitialized,
        onChanged: this.carouselInitialized,
      });
    }

    const $templatePreview = $(this.$refs.preview)
    $templatePreview.find('[data-lightbox="image"]').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-fade',
      image: {verticalFit: true},
    });
    $templatePreview.find('[data-lightbox="gallery"]').magnificPopup({
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
        preload: [0,1], // Will preload 0 - before current, and 1 after the current image
      },
    });
  },
  methods: {
    carouselInitialized(event) {
      const $carousel = $(this.$refs.carousel);
      $carousel.find('[data-lightbox="image"]').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-fade',
        image: {verticalFit: true},
      });
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
