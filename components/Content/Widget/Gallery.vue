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
  async mounted() {
    await import('magnific-popup');

    $(this.$refs.gallery.$el).magnificPopup({
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
  },
}
</script>
