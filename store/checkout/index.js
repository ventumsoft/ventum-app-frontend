export const actions = {
  async clear({commit, dispatch}) {
    commit('cart/clear', undefined, {root: true});
    dispatch('cart/fetch', undefined, {root: true});
    commit('delivery/clear');
  },
}
