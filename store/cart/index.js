export const state = () => ({
  loading: false,
  items: null,
  totalWithoutDiscount: null,
  totalWithDiscount: null,
  discounts: null,
  bonus: null,
  vat: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}

export const actions = {
  async fetch({state, commit}, {checkout} = {}) {
    let data = Object.keys(state).reduce((result, key) => {
      result[key] = null;
      return result;
    }, {});
    if (this.$auth.user) {
      commit('update', {loading: true});
      try {
        ({data} = (await this.$axios.get('cart/data', {params: {
          checkout,
        }})));
      } catch (exception) {
        //
      } finally {
        commit('update', {loading: false});
      }
    }
    commit('update', data);
  },
}
