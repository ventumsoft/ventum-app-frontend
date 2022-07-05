export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, req, ssrContext, $auth }) {
    if ($auth.user) {
      await dispatch('cart/fetch');
    }
  },
}
