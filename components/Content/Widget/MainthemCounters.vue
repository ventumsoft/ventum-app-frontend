<template>
  <div class="showcase-widget section notopmargin" style="background-color: #444; padding: 20px 0 0;margin-bottom: 0" data-widget="MainthemCounters">
    <div class="container clearfix">
      <div class="row">
        <div v-for="item of items" class="work col-md-2 col-sm-4 col-xs-6">
          <i class="i-large i-plain" :class="'icon-' + item.icon"></i>
          <div class="clear"></div>
          <div class="counter counter-small">
          <span :data-from="0" :data-to="item.value" :data-refresh-interval="10" :data-speed="3000">{{ item.value }}</span>
          </div>
          <h5 v-html="item.text"></h5>
          <div class="visible-sm bottommargin-sm"></div>
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
