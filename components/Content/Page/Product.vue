<template>
  <Fragment>
    <div class="container clearfix product-calculator">
      <ContentPageProductImages
        :productImageId="productImageId"
      />
      <ContentPageProductCalculator
        :params="params"
        :quantityComponent="quantityComponent"
        :kitComponent="kitComponent"
        :integrationsAvailableOnMobile="integrationsAvailableOnMobile"
        :integrationsAvailableOnDesktop="integrationsAvailableOnDesktop"
        @order="handleOrderCall"
      />
    </div>
    <ContentPageProductCreators
      :params="params"
      :integrations="integrations"
      :integrationsAvailableOnMobile="integrationsAvailableOnMobile"
      :integrationsAvailableOnDesktop="integrationsAvailableOnDesktop"
      @order="handleOrderCall"
    />
    <ContentPageProductTabs />
  </Fragment>
</template>

<script>
import CreatorEnum from '@/enums/CreatorEnum';

import {mapState} from 'vuex';

export default {
  data: () => ({
    params: {},
  }),
  computed: {
    ...mapState('page', ['product']),
    quantityComponent() {
      const componentId = Number(this.params.productComponentId);
      return this.product.calculator.quantityComponents?.find(component => component.id === componentId);
    },
    kitComponent() {
      const componentId = Number(this.params.productComponentId);
      return this.product.calculator.kitComponents?.find(component => component.id === componentId);
    },
    productImageId() {
      const type = this.product.imagesLinkSettings?.type || 'option';
      if (type === 'option') {
        return this.product.imagesLinkSettings.imageByElement?.[this.params.options?.[this.product.imagesLinkSettings.option]] ||
          this.product.imagesLinkSettings.imageByElement?.[this.params.options?.[this.product.imagesLinkSettings.optionByComponent?.[this.params.productComponentId]]];
      } else if (type === 'kit') {
        return this.product.imagesLinkSettings.imageByComponent?.[this.kitComponent?.id];
      }
    },
    integrations() {
      return (this.kitComponent || this.product)?.integrations;
    },
    integrationsAvailableOnMobile() {
      return this.integrations?.filter(integration => integration.visibility !== 'only-on-desktop');
    },
    integrationsAvailableOnDesktop() {
      return this.integrations?.filter(integration => integration.visibility !== 'only-on-mobile');
    },
  },
  beforeMount() {
    this.params = {};
  },
  methods: {
    handleOrderCall({integration} = {}) {
      if (!integration) {
        const $mobileChecker = $('<div class="visible-xs" style="display: none;"></div>').appendTo('body');
        const isMobile = $mobileChecker.is(':visible');
        $mobileChecker.remove();
        integration = isMobile ?
          this.integrationsAvailableOnMobile[0] :
          this.integrationsAvailableOnDesktop[0];
      }
      if (integration.creator === CreatorEnum.BUY_BUTTON) {
        this.$router.push({name: 'checkout/cart'});
      } else if (CreatorEnum.isEmbedded[integration.creator]) {
        console.log('show integration embedded creator modal');
      } else if ((integration.creator === CreatorEnum.UNIVERSAL) && !this.$store.state.site.settings?.['constructor:templates:skip-template-selection'] && !integration.settings?.skipTemplateSelection) {
        this.$router.push({name: 'slug/templates', params: {slug: this.$route.params.slug}, query: {compilationId: undefined}});
      } else {
        this.$router.push({name: 'creator/creator', params: {creator: integration.creator}, query: {compilationId: undefined}});
      }
    },
  },
}
</script>
