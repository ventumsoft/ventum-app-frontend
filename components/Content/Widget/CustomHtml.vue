<template>
  <div
    class="showcase-widget no-fv container clearfix last-no-margin"
    data-widget="MainthemCustomHtml"
    :style="{'padding-top': paddingTop + 'px', 'padding-bottom': paddingBottom + 'px'}"
  >
    <div v-if="isTitleEnabled" class="fancy-title title-border title-center">
      <h3 v-html="title"></h3>
    </div>
    <div class="accordion clearfix" data-state="first" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    isTitleEnabled: {type: Boolean, default: true},
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    paddingTop: {type: Number, default: 60},
    paddingBottom: {type: Number, default: 60},
  },
}
</script>
