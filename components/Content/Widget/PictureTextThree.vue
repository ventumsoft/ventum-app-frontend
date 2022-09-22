<template>
  <div class="showcase-widget container clearfix  last-no-margin padding-top-bottom-60" data-widget="MainthemPictureTextThree">
    <div class="fancy-title title-border title-center  bottommargin">
      <h3 v-html="title"></h3>
    </div>
    <div v-for="(item, index) of items" class="col_one_third nobottommargin" :class="{col_last: index % 3 === 2}">
      <div class="feature-box media-box">
        <div class="fbox-media" style="height: 210px;">
          <img
            :src="item.image || '/images/no-image.png'"
            :srcset="(item.image || '/images/no-image.png') + ', ' + (item.image2x || '/images/no-image.png') + ' 2x'"
            :alt="item.alt"
          >
        </div>
        <div class="fbox-desc">
          <h3>
            <fragment v-html="item.title"></fragment>
            <span class="subtitle" v-html="item.subtitle"></span>
          </h3>
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>
    <div class="clear"></div>
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
