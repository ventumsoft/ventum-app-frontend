<template>
  <fragment>
    <PageTitle
      v-if="pageEntity && ((pageType !== 'Static') || (pageEntity.type !== 'main'))"
      :title="pageEntity.meta?.h1 || pageEntity.title"
      :breadcrumbs="pageEntity.breadcrumbs"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section
      id="content"
      :class="{'no-top-widgets': !$store.state.widgets.page?.top?.length}"
      :style="{
          fontSize: ((pageType === 'BlogMain') || (pageType === 'Custom') || (pageType === 'FaqItem')) && '15px' || '',
        }"
    >
      <div
        class="content-wrap"
        :class="{
            'showcase-widget-container': (pageType === 'Static') && pageEntity && ((pageEntity.type === 'main') || (pageEntity.type === 'contacts')),
            'category-widget-container': pageType === 'ProductCategory',
            'product-widget-container': pageType === 'Product',
            'blog-widget-container': pageType === 'BlogArticle',
            'custom-page-widget-container': pageType === 'Custom',
          }"
        :style="{
            padding: ((pageType === 'BlogMain') || (pageType === 'BlogCategory')) && '60px 0' || '',
          }"
      >
        <component
          v-if="pageType && (pageType !== 'Static')"
          :is="'ContentPage' + pageType"
          :key="$store.state.site.language.slug + '-' + pageType + '-' + pageEntity.id"
        ></component>
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" />
  </fragment>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', {pageType: 'type'}),
    ...mapGetters('page', {pageEntity: 'entity'}),
  },
}
</script>
