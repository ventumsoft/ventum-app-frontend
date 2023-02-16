<template>
  <div id="categories" class="showcase-widget container clearfix last-no-margin" data-widget="MainthemAllProducts">
    <div class="fancy-title title-border title-center notopmargin">
      <h3 v-html="title"></h3>
    </div>
    <div id="shop" class="product-3 clearfix">
      <div v-for="(item, index) of items" class="product clearfix" :class="{alt: index % 3 === 2}">
        <TheLink :to="item.link">
          <div class="product-image">
            <img
              :src="item.image || '/images/no-image.png'"
              :srcset="(item.image || '/images/no-image.png') + ', ' + (item.image2x || '/images/no-image.png') + ' 2x'"
              :alt="item.name"
              :loading="(index >= 3) ? 'lazy' : ''"
            >
            <div v-if="item.new" class="sale-flash new">{{ $trans('widgets.all_category.novelty') }}</div>
            <div v-if="item.sale" class="sale-flash" :style="{'margin-top': item.new ? '42px' : ''}">- {{ item.sale }}%</div>
          </div>
          <div class="product-desc">
            <div class="product-title center">
              <h3 v-html="item.name"></h3>
            </div>
            <div v-if="item.promo" class="product-price center" v-html="item.promo"></div>
          </div>
        </TheLink>
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
