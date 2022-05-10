<template>
  <div class="showcase-widget col-md-3 col-sm-4 col-xs-6" data-widget="MainthemFooterBadges">
    <div class="widget clearfix">
      <h4>{{ title }}</h4>
      <div class="footer-badges-images">
        <img
          v-for="item of items"
          :src="item.image || '/images/no-image.png'"
          :alt="item.name"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    items: {type: Array},
  },
}
</script>
