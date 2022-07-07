export const state = () => ({
  items: null,
  itemsTotalWithoutDiscount: null,
  itemsTotalWithDiscount: null,
  discounts: null,
  bonus: null,
  vatWithoutDiscount: null,
  vatWithDiscount: null,
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
  async fetch({state, commit}, {summary, delivery} = {}) {
    console.log('cart/fetch', {summary, delivery});
    if (!this.$auth.user) {
      commit('update', Object.keys(state).reduce((result, key) => {
        result[key] = null;
        return result;
      }, {}));
      return;
    }
    let items = [],
      itemsTotalWithoutDiscount,
      itemsTotalWithDiscount,
      discounts,
      bonus,
      vatWithoutDiscount,
      vatWithDiscount,
      deliveryMethods,
      deliveryData;
    try {
      ({data: {
        items,
        itemsTotalWithoutDiscount,
        itemsTotalWithDiscount,
        discounts,
        bonus,
        vatWithoutDiscount,
        vatWithDiscount,
        deliveryMethods,
        deliveryData,
      }} = (await this.$axios.get('cart/data', {params: {
        summary,
        delivery,
      }})));
    } catch (exception) {
      //
    }
    commit('update', {
      items,
      itemsTotalWithoutDiscount,
      itemsTotalWithDiscount,
      discounts,
      bonus,
      vatWithoutDiscount,
      vatWithDiscount,
      deliveryMethods,
      deliveryData,
    });
  },
}
