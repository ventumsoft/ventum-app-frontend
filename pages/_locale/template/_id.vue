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
              <div class="product-template-preview-content" v-mfp:gallery="Boolean(template.pagesImages)">
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
              <li><span><i class="icon-calendar3"></i>{{ $trans('product.template.created_by') }}</span>{{ $dt(template.created_at, 'date') }}</li>
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
            <div id="owl-carousel-templates" class="owl-carousel portfolio-carousel" v-owl-carousel="{loop: (template.similar.length > 2) ? 1 : 0}">
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
                    <div class="portfolio-overlay" v-mfp:gallery="Boolean(similarTemplate.pagesImages)">
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
                      <a v-else :href="similarTemplate.image" class="center-icon" v-mfp:image>
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
      link: [
        {rel: 'canonical', href: this.template.url},
      ],
      meta: [
        {name: 'description', content: this.metaDescription},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: this.metaTitle},
        {property: 'og:description', content: this.metaDescription},
        {property: 'og:url', content: this.template.url},
        {property: 'og:image', content: this.template.image + '?' + 'width=955&height=500&fit=exact'},
      ],
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
}
</script>
