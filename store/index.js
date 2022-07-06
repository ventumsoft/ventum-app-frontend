export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, req, ssrContext, $auth, route }) {
    if ($auth.user) {
      await dispatch('cart/fetch', {summary: route.name.startsWith('checkout/')});
    }
  },
}
