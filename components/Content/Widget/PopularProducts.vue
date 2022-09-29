<template>
  <div
    v-if="products?.length"
    class="showcase-widget container clearfix last-no-margin padding-top-bottom-60"
    data-widget="MainthemPopularProducts"
  >
    <h3 v-html="title"></h3>
    <div class="owl-carousel product-carousel fixed-size-image" v-owl-carousel="{
      margin: 20,
      nav: products.length > 2,
      loop: products.length > 2,
    }">
      <div v-for="product of products" class="oc-item">
        <div class="product iproduct clearfix">
          <div class="product-image-wrapper">
            <div class="product-image">
              <TheLink :to="product.link">
                <img
                  :src="product.image || '/images/placeholder.jpg'"
                  :srcset="product.image && product.image2x ? (product.image + ', ' + product.image2x + ' 2x') : null"
                  :alt="product.name"
                  loading="lazy"
                  style="object-fit: cover;"
                >
                <div v-if="product.info?.is_new || product.info?.discount" class="sale-flash-container">
                  <div v-if="product.info?.is_new" class="sale-flash new">{{ $trans('widgets.all_category.novelty') }}</div>
                  <div v-if="product.info?.discount" class="sale-flash">{{ $trans('widgets.content-widgets.popular-products.sale_text', {sale: parseInt(product.info.discount)}) }}</div>
                </div>
              </TheLink>
            </div>
            <div class="product-desc center">
              <div class="product-title">
                <h3><TheLink :to="product.link">{{ product.name || $trans('product.label.product') }}</TheLink></h3>
              </div>
              <TheLink v-if="product.info?.promoPrice" :to="product.link"><div class="product-price" v-html="product.info.promoPrice"></div></TheLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    products: {type: Array},
  },
}
</script>
