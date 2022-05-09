<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemFeaturesThree">
    <div class="fancy-title title-border title-center bottommargin">
      <h3 v-html="title"></h3>
    </div>
    <template v-for="(item, index) of items">
      <div class="col_one_third" :class="{col_last: (index + 1) % 3 === 0}">
        <div class="feature-box fbox-rounded">
          <div class="fbox-icon">
            <i class="i-alt" :class="['icon-' + item.icon]"></i>
          </div>
          <h3 v-html="item.title"></h3>
          <p v-html="item.subtitle"></p>
        </div>
      </div>
      <div v-if="(index + 1) % 3 === 0" class="clear"></div>
    </template>
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
