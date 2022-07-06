export const state = () => ({
  items: [],
  itemsTotalWithoutDiscount: null,
  itemsTotalWithDiscount: null,
  discounts: null,
  bonus: null,
  vat: null,
  total: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}

export const actions = {
  async fetch({commit}, {summary} = {}) {
    let items = [],
      itemsTotalWithoutDiscount,
      itemsTotalWithDiscount,
      discounts,
      bonus,
      vat,
      total;
    try {
      ({data: {
        items,
        itemsTotalWithoutDiscount,
        itemsTotalWithDiscount,
        discounts,
        bonus,
        vat,
        total,
      }} = (await this.$axios.get('cart/data', {params: {summary}})));
    } catch (exception) {
      //
    }
    commit('update', {
      items,
      itemsTotalWithoutDiscount,
      itemsTotalWithDiscount,
      discounts,
      bonus,
      vat,
      total,
    });
  },
}
