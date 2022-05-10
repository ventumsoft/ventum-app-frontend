<template>
  <div class="showcase-widget section topmargin-sm last-no-margin" data-widget="MainthemFeatures">
    <div class="clear"></div>
    <div class="container clearfix" style="margin-top: 30px; margin-bottom: 30px">
      <div v-for="item of items" class="col_one_fourth nobottommargin">
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
