<template>
  <Fragment>
    <TheTitle
      v-if="page.entity && ((page.type !== 'Static') || (page.entity.type !== 'main'))"
      :h1="page.entity.h1"
      :breadcrumbs="page.entity.breadcrumbs"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section id="content" :class="{'no-top-widgets': !$store.state.page.widgets.page?.top?.length}">
      <div
        class="content-wrap"
        :class="{
          'showcase-widget-container': (page.type === 'Page') && page.entity && ((page.entity.type === 'main') || (page.entity.type === 'contacts')),
          'category-widget-container': page.type === 'ProductCategory',
          'product-widget-container': page.type === 'Product',
          'blog-widget-container': page.type === 'BlogArticle',
          'custom-page-widget-container': page.type === 'Custom',
        }"
      >
        <component
          v-if="page.type !== 'Static'"
          :is="'ContentPage' + page.type"
        ></component>
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" />
  </Fragment>
</template>

<script>
import {Fragment} from 'vue-frag';
import {mapState} from "vuex";

export default {
  components: {
    Fragment,
  },
  computed: {
    ...mapState(['page']),
  },
}
</script>
