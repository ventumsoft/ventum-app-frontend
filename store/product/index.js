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
  async handleOrderCall({commit, getters, dispatch, rootState}, {integration} = {}) {
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
    } else {
      const isNeedsToChooseTemplate = (integration.creator === CreatorEnum.UNIVERSAL) &&
        !rootState.site.settings?.['constructor:templates:skip-template-selection'] &&
        !integration.settings?.skipTemplateSelection;
      const compilation = await dispatch('createCompilation', {integration});
      this.$router.push(this.$page(isNeedsToChooseTemplate ? {
        name: 'slug/templates',
        params: {slug: this.$router.currentRoute.params.slug},
        query: {compilationId: compilation.id},
      } : {
        name: 'creator/creator',
        params: {creator: integration.creator},
        query: {compilationId: compilation.id},
      }));
    }
  },

  async handleOrderSubmit({state, commit, dispatch, rootState}, {integration, embeddedCreatorFormData, callbackBeforeRedirect}) {
    console.log('handleOrderSubmit');

    const compilation = await dispatch('createCompilation', {integration, embeddedCreatorFormData});

    try {
      await this.$axios.post('cart/add', {
        productId: rootState.page.product.id,
        compilationId: compilation?.id,
        integrationId: integration?.id || undefined,
        params: state.params,
      });
    } catch (exception) {
      this.$noty(exception.response?.data?.message || exception.message, 'error');
      return;
    }

    callbackBeforeRedirect && (await callbackBeforeRedirect());

    this.$router.push(this.$page({name: 'checkout/cart'}));
  },

  async createCompilation({state, commit, rootState}, {integration, embeddedCreatorFormData} = {}) {
    let compilation;

    try {
      await this.$auth.getUserOrGuest();
      ({data: compilation} = await this.$axios.post('products/compilation', {
        productId: rootState.page.product.id,
        params: state.params,
        creator: integration?.creator || undefined,
        // embeddedCreatorFormData
      }));
    } catch (exception) {
      this.$noty(exception.response?.data?.message || exception.message, 'error');
      return;
    }

    return compilation;
  },
}
