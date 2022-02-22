<template>
  <div class="showcase-widget section last-no-margin" data-widget="MainthemMainFeatures">
    <div class="container clearfix">
      <div v-for="(item, index) of items" class="col_one_fourth nobottommargin" :class="{col_last: (index % 4) === 3}">
        <div class="feature-box fbox-plain fbox-dark fbox-small">
          <div class="fbox-icon">
            <i :class="'icon-' + item.icon"></i>
          </div>
          <h3 v-html="item.title"></h3>
          <p class="notopmargin" v-html="item.subtitle"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {type: Array},
  },
}
</script>
