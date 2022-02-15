<template>
  <Fragment>
    <TheTitle
      :title="'Page title'"
      :breadcrumbs="[{title: 'Main', url: '/'}, {title: 'Page'}]"
    />
    <ContentWidgetsOnPage type="page" location="top" />
    <section id="content" :class="{'no-top-widgets': false}">
      <div class="content-wrap showcase-widget-container">
        <!-- product category: items -->
        <!-- product: images/calculator/creators/tabs -->
        <!-- blog article: content -->
        <!-- custom page: content -->
        <ContentWidgetsOnPage type="page" location="middle" />
      </div>
    </section>
    <ContentWidgetsOnPage type="page" location="bottom" />
  </Fragment>
</template>

<script>
import {Fragment} from 'vue-frag';

export default {
  components: {
    Fragment,
  },
}
</script>
