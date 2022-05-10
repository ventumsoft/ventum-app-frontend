<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-60" data-widget="MainthemSimilarProducts">
    <div class="fancy-title title-border title-center" >
      <h3 v-html="title"></h3>
    </div>
    <div class="container clearfix">
      <div v-for="rowNumber in Math.floor((items.length + 1) / 2)" class="row clearfix">
        <div v-for="item in items.slice((rowNumber - 1) * 2, rowNumber * 2)" class="col-md-6 bottommargin">
          <div class="team team-list clearfix">
            <div class="team-image">
              <TheLink :to="item.product.link">
                <img
                  :src="item.product.image || '/images/placeholder.jpg'"
                  :srcset="item.product.image && item.product.image2x ? (item.product.image + ', ' + item.product.image2x + ' 2x') : null"
                  :alt="item.product.name"
                  loading="lazy"
                >
              </TheLink>
            </div>
            <div class="team-desc">
              <div class="product-title">
                <h3>
                  <TheLink :to="item.product.link">
                    {{ item.product.name }}
                  </TheLink>
                </h3>
              </div>
              <div
                v-if="item.product.promoPrice"
                class="product-price"
                v-html="item.product.promoPrice"
              ></div>
              <ul class="iconlist iconlist-color nobottommargin  hidden-xs">
                <li v-for="phrase of item.phrases"><i class="icon-caret-right"></i> {{ phrase }}</li>
              </ul>
              <div class="team-button">
                <TheLink :to="item.product.link" class="button button-border button button-rounded nomargin">
                  <span>{{ $trans('widgets.similiar_products.order') }}</span>
                  <i class="icon-angle-right"></i>
                </TheLink>
              </div>
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
    items: {type: Array},
  },
}
</script>
