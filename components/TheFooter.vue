<template>
  <footer
    id="footer"
    class="dark"
    :style="{
      background: ($store.state.site.settings?.['footer_bg_type'] === 'color') ? ($store.state.site.settings?.['footer_bg_color'] || '#fff') : ('url(' + $store.state.site.settings?.['footer_bg_image'] || '/images/no-image.png' + ')'),
      backgroundSize: ($store.state.site.settings?.['footer_bg_type'] !== 'color') ? 'cover' : '',
    }"
  >
    <div class="container">
      <div v-if="void 'isShowFrontTaxSwitch'" class="col_full text-center" style="padding-top: 15px;">
        <div class="col_two_third nobottommargin">
          site/footer.tax-switcher-text-default
        </div>
      </div>
      <div class="footer-widgets-wrap clearfix">
        <div class="col_full">
          <div class="widget clearfix">
            <div class="row">
              <ContentWidgetsOnPage type="footer" location="middle" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="copyrights" style="padding-top: 10px; padding-bottom: 10px;">
      <div class="container clearfix">
        <ContentWidgetsOnPage type="footer" location="bottom" />
        <div class="col_half col_last tright">
          Powered by <a :href="$store.state.site.settings?.['general:super-company-url']" target="_blank">
          {{ $store.state.site.settings?.['general:super-company-name'] }}
        </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['widgets']),
  },
}
</script>
