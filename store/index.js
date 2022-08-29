export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, req, ssrContext, $auth, route }) {
    if (!route.name?.startsWith('checkout/')) {
      await dispatch('cart/fetch');
    }
  },
}
