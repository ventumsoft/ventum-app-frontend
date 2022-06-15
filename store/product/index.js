import Vue from 'vue';
import CreatorEnum from '@/enums/CreatorEnum';

export const state = () => ({
  params: {},
  currentActiveEmbeddedIntegration: false,
});

export const mutations = {
  initEmptyParams(state) {
    state.params = {};
  },
  setParamsValue(state, {key, value}) {
    const subKeys = key.split('.');
    let paramsLevel = state.params;
    for (const [index, subKey] of subKeys.entries()) {
      if (index < subKeys.length - 1) {
        if (paramsLevel[subKey] === undefined) {
          Vue.set(paramsLevel, subKey, {});
        }
        paramsLevel = paramsLevel[subKey];
      } else {
        if (value !== undefined) {
          Vue.set(paramsLevel, subKey, value);
        } else {
          Vue.delete(paramsLevel, subKey);
        }
      }
    }
  },
  setCurrentActiveEmbeddedIntegration(state, integration) {
    state.currentActiveEmbeddedIntegration = integration;
  },
  updateCurrentActiveEmbeddedIntegrationUsingPrice(state, value) {
    state.currentActiveEmbeddedIntegration.usingPrice = value;
  },
}

export const getters = {
  quantityComponent: (state, getters, rootState) =>
    rootState.page.product.calculator.quantityComponents?.find(component =>
      component.id === state.params.productComponentId),
  kitComponent: (state, getters, rootState) =>
    rootState.page.product.calculator.kitComponents?.find(component =>
      component.id === state.params.productComponentId),
  integratable: (state, getters, rootState) =>
    getters.kitComponent || rootState.page.product,
  integrations: (state, getters) =>
    getters.integratable.integrations,
  integrationsAvailableOnMobile: (state, getters) =>
    getters.integrations?.filter(integration => integration.visibility !== 'only-on-desktop'),
  integrationsAvailableOnDesktop: (state, getters) =>
    getters.integrations?.filter(integration => integration.visibility !== 'only-on-mobile'),
}

export const actions = {
  handleOrderCall({commit, getters, dispatch, rootState}, {integration} = {}) {
    if (!integration) {
      const $mobileChecker = $('<div class="visible-xs" style="display: none;"></div>').appendTo('body');
      const isMobile = $mobileChecker.is(':visible');
      $mobileChecker.remove();
      integration = isMobile ?
        getters.integrationsAvailableOnMobile[0] :
        getters.integrationsAvailableOnDesktop[0];
    }
    if (integration.creator === CreatorEnum.BUY_BUTTON) {
      dispatch('handleOrderSubmit', {integration});
    } else if (CreatorEnum.isEmbedded[integration.creator]) {
      commit('setCurrentActiveEmbeddedIntegration', integration);
    } else if ((integration.creator === CreatorEnum.UNIVERSAL) && !rootState.site.settings?.['constructor:templates:skip-template-selection'] && !integration.settings?.skipTemplateSelection) {
      this.$router.push(this.$page({name: 'slug/templates', params: {slug: this.$router.currentRoute.params.slug}, query: {compilationId: undefined}}));
    } else {
      this.$router.push(this.$page({name: 'creator/creator', params: {creator: integration.creator}, query: {compilationId: undefined}}));
    }
  },
  async handleOrderSubmit({state, commit, rootState}, {integration, embeddedCreatorFormData}) {
    console.log('handleOrderSubmit product', rootState.page.product.id);
    console.log('handleOrderSubmit params', JSON.stringify(state.params));
    console.log('handleOrderSubmit integration', integration.creator, integration.id);
    console.log('handleOrderSubmit embeddedCreatorFormData', JSON.stringify(embeddedCreatorFormData));

    // get auth user or login with temporary user

    // create compilation
    // add to cart

    commit('setCurrentActiveEmbeddedIntegration', null);
    await new Promise(resolve => setTimeout(() => resolve(), 2000));
    //await Vue.nextTick();

    this.$router.push(this.$page({name: 'checkout/cart'}));
  },
}
