<template>
  <div
    v-if="integrations?.length"
    class="container clearfix topmargin-sm"
    :class="{
      'hidden-xs': !(integrationsAvailableOnMobile?.length > 1),
      'hidden-sm hidden-md hidden-lg': !(integrationsAvailableOnDesktop?.length > 1),
    }"
  >
    <div class="product-creators-integrations">
      <div
        v-for="integration of integrations"
        class="product-creator-integration"
        :class="{
          'hidden-xs': integration.visibility === 'only-on-desktop',
          'hidden-sm hidden-md hidden-lg': integration.visibility === 'only-on-mobile',
        }"
        :data-integration-visibility="integration.visibility"
        :data-creator="integration.creator"
      >
        <style type="text/css" v-html="'[data-creator=' + integration.creator + '] button.button { border-color: ' + integration.color + ' !important; color: ' + integration.color + ' !important; } '"></style>
        <style type="text/css" v-html="'[data-creator=' + integration.creator + '] button.button:hover { background-color: ' + integration.color + ' !important; } '"></style>
        <a
          href="#"
          class="product-creator-integration-button"
          :data-integration-id="integration.id"
          @click.prevent="$emit('order', {integration})"
        >
          <div class="feature-box fbox-center fbox-bg fbox-effect">
            <div class="fbox-icon">
              <i
                class="i-alt"
                :class="CreatorEnum.iconByCreator[integration.creator]"
                style="color: #ffffff;"
                :style="{'background-color': integration.color + '!important'}"
              ></i>
            </div>
            <h3>
              {{ integration.title }}
              <span class="subtitle">
                {{ integration.description }}
                <span v-if="usingPriceByIntegration[integration.id]" class="product-creator-integration-using-price">
                  (+{{ usingPriceByIntegration[integration.id] }})
                </span>
              </span>
            </h3>
            <button
              type="button"
              class="button button-white button-border noshadow button-rounded noleftmargin norightmargin"
            >
              <span>{{ integration.button }}</span>
            </button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import CreatorEnum from '@/enums/CreatorEnum';

export default {
  props: [
    'params',
    'integratable',
    'integrations',
    'integrationsAvailableOnMobile',
    'integrationsAvailableOnDesktop',
  ],
  data: () => ({
    CreatorEnum,
  }),
  computed: {
    usingPriceByIntegration() {
      return this.integrations.reduce((result, integration) => {
        result[integration.id] = this.getUsingPrice(integration);
        return result;
      }, {});
    },
  },
  methods: {
    getUsingPrice(integration) {
      const usingPriceSettings = integration.settings?.usingPrice || {};

      const way = usingPriceSettings.way || 'manually';

      let value;
      if (way === 'manually') {
        value = usingPriceSettings.manually
      } else if (way === 'option-element') {
        const option = this.integratable.calculator.options.find(option => option.id == usingPriceSettings.optionId);
        const optionValue = this.params.options?.[usingPriceSettings.optionId];
        if (option?.inputType === 'range') {
          value = parseFloat(usingPriceSettings.unitPrice * (optionValue || option.range?.from || 0));
        } else {
          value = usingPriceSettings.optionElements && usingPriceSettings.optionElements[optionValue];
        }
      } else if (way === 'component') {
        const componentQuantity = this.params.componentQuantity?.[usingPriceSettings.componentId];
        value = parseFloat(usingPriceSettings.componentBasePrice) + parseFloat(usingPriceSettings.componentUnitPrice) * componentQuantity;
      }

      if (this.$store.state.product.currentActiveEmbeddedIntegration?.id === integration.id) {
        this.$store.commit('product/updateCurrentActiveEmbeddedIntegrationUsingPrice', value);
      }

      return value;
    },
  },
}
</script>
