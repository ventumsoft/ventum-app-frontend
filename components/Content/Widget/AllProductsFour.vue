<template>
  <div id="categories" class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemAllProductsFour">
    <div class="fancy-title title-border title-center notopmargin">
      <h3 v-html="title"></h3>
    </div>
    <ul class="clients-grid grid-4 nobottommargin clearfix">
      <li v-for="item of items">
        <div class="category">
          <TheLink :to="item.link">
            <div v-if="item.new" class="sale-flash-container"><div class="sale-flash new">{{ $trans('widgets.all_category.novelty') }}</div></div>
            <div v-if="item.sale" class="sale-flash-container"><div class="sale-flash" :style="{'margin-top': item.new ? '42px' : ''}">- {{ item.sale }}%</div></div>
            <img
              class="category-icon"
              :src="item.image || '/images/no-image.png'"
              :srcset="(item.image || '/images/no-image.png') + ', ' + (item.image2x || '/images/no-image.png') + ' 2x'"
              :alt="item.name"
              loading="lazy"
            >
            <br />
            <h4 v-html="item.name"></h4>
          </TheLink>
        </div>
      </li>
    </ul>
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
