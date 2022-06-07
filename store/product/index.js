export const state = () => ({
  currentActiveEmbeddedIntegration: false,
});

export const mutations = {
  setCurrentActiveEmbeddedIntegration(state, integration) {
    state.currentActiveEmbeddedIntegration = integration;
  },
  updateCurrentActiveEmbeddedIntegrationUsingPrice(state, value) {
    state.currentActiveEmbeddedIntegration.usingPrice = value;
  },
}

export const actions = {
  //
}
