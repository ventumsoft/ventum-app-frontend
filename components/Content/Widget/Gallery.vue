<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemGallery">
    <div class="fancy-title title-border title-center notopmargin">
      <h3 v-html="title"></h3>
    </div>
    <TheIsotope
      ref="gallery"
      v-if="items?.length"
      :list="items"
      :options="{masonry: true}"
      class="col_full masonry-thumbs col-6 bottommargin-lg clearfix"
      v-mfp:gallery
    >
      <a
        v-for="(item, index) of items"
        :key="index"
        :href="item.image || '/images/no-image.png'"
        :title="item.title"
        data-lightbox="gallery-item"
      >
        <img
          class="image_fade"
          :src="item.image || '/images/no-image.png'"
          :alt="item.title"
        />
      </a>
    </TheIsotope>
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
