<template>
  <div class="col_two_third portfolio-single-image nobottommargin product-images-block">
    <div class="sale-flash-container" style="z-index: 3;">
      <div v-if="product.is_new" class="sale-flash new">site/product.new!</div>
      <div v-if="product.discount" class="sale-flash">site/product.discount - {{ product.discount * 1 }}%</div>
      <div v-if="product.totalDiscountLabel" class="sale-flash">- {{ totalDiscountLabel }}</div>
    </div>
    <div class="fslider product-images-slider" :data-slideshow="product.is_images_slider_enabled">
      <div class="flexslider">
        <div class="slider-wrap">
          <div
            v-for="(image, index) of (product.images?.length ? product.images : [null])"
            class="slide"
            :id="(index === 0) ? 'product-picture' : null"
            :data-product-image-id="image?.id"
            :data-thumb="image?.thumb || '/images/placeholder.jpg'"
          >
            <div class="product-images-slider-image-container">
              <div class="product-slider-image-subcontainer">
                <a href="#" @click.prevent>
                  <img
                    :src="image?.link || '/images/placeholder.jpg'"
                    :srcset="image?.link && image?.link2x ? (image.link + ', ' + image.link2x + ' 2x') : null"
                    :loading="(index !== 0) ? 'lazy' : null"
                    :alt="product.title"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['product']),
  },
}
</script>
