<template>
  <fragment>
    <PageTitle
      :title="meta?.h1"
      :breadcrumbs="breadcrumbs"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div class="sidebar clearfix">
            <ul v-if="categories?.length" class="demos-filter clearfix ">
              <li :class="{activeFilter: !$route.query.categoryId}">
                <TheLink :to="$page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, categoryId: undefined, page: undefined}})">
                  {{ $trans('product.templates.show_all') }}
                </TheLink>
              </li>
              <li v-for="category of categories" :class="{activeFilter: category.id == $route.query.categoryId}">
                <TheLink :to="$page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, categoryId: category.id, page: undefined}})">
                  {{ category.title }}
                </TheLink>
              </li>
            </ul>
            <ul v-if="priceKinds?.length" class="demos-filter clearfix ">
              <li :class="{activeFilter: !$route.query.price}">
                <TheLink :to="$page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, price: undefined, page: undefined}})">
                  {{ $trans('product.templates.show_all') }}
                </TheLink>
              </li>
              <li v-for="priceKind of priceKinds" :class="{activeFilter: priceKind === $route.query.price}">
                <TheLink :to="$page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, price: priceKind, page: undefined}})">
                  {{ $trans('product.templates.' + priceKind) }}
                </TheLink>
              </li>
            </ul>
            <ul class="demos-filter clearfix color-filter">
              <li class="color" :class="{activeFilter: !$route.query.color}">
                <TheLink :to="$page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, color: undefined, page: undefined}})">
                  {{ $trans('product.templates.show_all') }}
                </TheLink>
              </li>
              <TheLink
                v-for="color of TemplateColorEnum"
                :key="color"
                :class="['color', (color === $route.query.color) && 'activeFilter', TemplateColorEnum?.classesForCheck?.[color]].filter(v => v)"
                :to="$page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, color, page: undefined}})"
                :style="{backgroundColor: color}"
              ></TheLink>
            </ul>
          </div>
          <div class="postcontent nobottomborder col_last clearfix">
            <div ref="templatesContainer" class="portfolio-container">
              <div id="portfolio" class="portfolio-3 portfolio-masonry clearfix">
                {{ ' ' }}
                <article v-if="!$route.query.categoryId && !(pagination?.page > 1)" class="portfolio-item product-templates-item">
                  <div class="portfolio-image">
                    <TheLink
                      class="product-template-thumb"
                      :to="$page({name: 'creator/creator', params: {creator: 'universal'}, query: (({productId, compilationId}) => ({productId, compilationId}))($route.query)})"
                    >
                      <div class="product-templates-item-empty">
                        <i class="icon-line2-doc"></i>
                      </div>
                    </TheLink>
                  </div>
                  <div v-if="!$store.state.site.settings?.['constructor:templates:hide-template-usages'] || !$store.state.site.settings?.['constructor:templates:hide-template-price']" class="portfolio-desc clearfix">
                    <h3>
                      <TheLink :to="$page({name: 'creator/creator', params: {creator: 'universal'}, query: (({productId, compilationId}) => ({productId, compilationId}))($route.query)})">
                        {{ $trans('product.templates.empty-template') }}
                      </TheLink>
                    </h3>
                  </div>
                </article>
                {{ ' ' }}
                <template v-for="(template, index) of templates" v-if="$route.query.categoryId || (pagination?.page > 1) || !(pagination?.pages > 1) || (index !== templates.length - 1)">
                  {{ ' ' }}
                  <article class="portfolio-item product-templates-item">
                    <div class="portfolio-image">
                      <TheLink
                        class="product-template-thumb"
                        :to="$page({name: 'creator/creator', params: {creator: 'universal'}, query: {templateId: template.id, ...(({productId, compilationId}) => ({productId, compilationId}))($route.query)}})"
                      >
                        <img
                          class="lazy"
                          loading="lazy"
                          :src="template.preview"
                          :srcset="template.preview2x && (template.preview + ', ' + template.preview2x + ' 2x')"
                          :alt="template.title"
                        >
                      </TheLink>
                      <div class="portfolio-overlay">
                        <a
                          class="center-icon"
                          :class="{'two-icons': !$store.state.site.settings?.['constructor:templates:disable-template-page']}"
                          :href="template.image"
                          v-mfp:gallery="template.pagesImages ? {items: template.pagesImages.map(templatePageImage => ({src: templatePageImage.full}))} : false"
                          v-mfp:image="!template.pagesImages"
                        ><i class="icon-line-plus"></i></a>
                        <TheLink
                          v-if="!$store.state.site.settings?.['constructor:templates:disable-template-page']"
                          class="center-icon two-icons"
                          :to="$page({name: 'template/id', params: {id: template.id}, query: (({productId, compilationId}) => ({productId, compilationId}))($route.query)})"
                        ><i class="icon-line-ellipsis"></i></TheLink>
                      </div>
                    </div>
                    <div v-if="!$store.state.site.settings?.['constructor:templates:hide-template-usages'] || !$store.state.site.settings?.['constructor:templates:hide-template-price']" class="portfolio-desc clearfix">
                      <TheLink
                        :to="
                          $store.state.site.settings?.['constructor:templates:disable-template-page'] ?
                            $page({name: 'creator/creator', params: {creator: 'universal'}, query: {templateId: template.id, ...(({productId, compilationId}) => ({productId, compilationId}))($route.query)}}) :
                            $page({name: 'template/id', params: {id: template.id}, query: (({productId, compilationId}) => ({productId, compilationId}))($route.query)})
                        "
                      >
                        <span v-if="!$store.state.site.settings?.['constructor:templates:hide-template-usages']"><i class="icon-line2-printer"></i> {{ template.usages }}</span>
                        <span v-if="!$store.state.site.settings?.['constructor:templates:hide-template-usages'] && !$store.state.site.settings?.['constructor:templates:hide-template-price']" class="separate-padding"> | </span>
                        <span v-if="!$store.state.site.settings?.['constructor:templates:hide-template-price']" class="color">{{ template.price }}</span>
                      </TheLink>
                    </div>
                  </article>
                  {{ ' ' }}
                </template>
                <div v-if="pagination" class="col_full">
                  <div class="pagination-container center">
                    <ThePagination
                      class="nomargin"
                      :pagesCount="pagination.pages"
                      :currentPage="pagination.page"
                      :routeBuilder="page => $page({name: 'slug/templates', params: {slug: $route.params.slug}, query: {...$route.query, page}})"
                    />
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
import TemplateColorEnum from '@/enums/TemplateColorEnum';

export default {
  data: () => ({
    TemplateColorEnum,
  }),
  head() {
    return {
      title: this.meta?.title,
      link: [
        {rel: 'canonical', href: this.$router.resolve(this.$page({name: 'slug/templates', params: {slug: this.$route.params.slug}, query: {categoryId: this.$route.query.categoryId}})).href},
      ],
      meta: [
        {name: 'description', content: this.meta?.description},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: this.meta?.title},
        {property: 'og:description', content: this.meta?.description},
        {property: 'og:url', content: this.$router.resolve(this.$page({name: 'slug/templates', params: {slug: this.$route.params.slug}, query: {categoryId: this.$route.query.categoryId}})).href},
        {property: 'og:image', content: this.$store.state.site.settings?.['logo_og'] || '/images/no-image.png'},
      ],
    };
  },
  async asyncData({route, $axios}) {
    const {
      data: templates,
      pagination,
      breadcrumbs,
      meta,
      categories,
      priceKinds,
    } = (await $axios.get('products/templates', {
      params: {
        slug: route.params.slug,
        categoryId: route.query.categoryId,
        price: route.query.price,
        color: route.query.color,
        page: route.query.page,
      },
      showErrorPageOnException: true,
    })).data;
    return {
      templates,
      pagination,
      breadcrumbs,
      meta,
      categories,
      priceKinds,
    };
  },
  async mounted() {
    this.TemplateColorEnum = TemplateColorEnum;
    await import('jquery-lazyload');
    await this.$nextTick();
    this.magnificPopupInitialize();
  },
  watch: {
    async '$route.query'() {
      await this.$nextTick();
      this.magnificPopupInitialize();
    },
  },
  watchQuery: true,
  methods: {
    magnificPopupInitialize() {
      const $container = $(this.$refs.templatesContainer);
      $container.find('img.lazy').lazyload({event: 'turnPage'});
      $container.find('img.lazy').lazyload({threshold: 200});
    },
  },
}
</script>
