export const state = () => ({
  items: null,
  totalWithoutDiscount: null,
  totalWithDiscount: null,
  discounts: null,
  bonus: null,
  vat: null,
  deliveryMethods: null,
  deliveryData: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}

export const actions = {
  async fetch({state, commit}, {checkout, delivery} = {}) {
    let data = Object.keys(state).reduce((result, key) => {
      result[key] = null;
      return result;
    }, {});
    if (this.$auth.user) {
      try {
        ({data} = (await this.$axios.get('cart/data', {params: {
          checkout,
          delivery,
        }})));
      } catch (exception) {
        //
      }
    }
    commit('update', data);
  },
}
