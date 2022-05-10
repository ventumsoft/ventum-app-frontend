<template>
  <div class="showcase-widget col-md-3 col-sm-4 col-xs-6 widget_links" data-widget="MainthemFooterInfoMenu">
    <div class="widget widget_links clearfix">
      <h4>
        <TheLink :to="link" :without-link-if-empty="true">
          {{ title }}
        </TheLink>
      </h4>
      <ul>
        <li v-for="item of items">
          <TheLink :to="item.link">
            {{ item.title }}
          </TheLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    link: {type: String},
    items: {type: Array},
  },
}
</script>
