export const state = () => ({
  items: [],
  totalWithoutDiscount: null,
  totalWithDiscount: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}

export const actions = {
  async fetch({commit}) {
    let items = [], totalWithoutDiscount, totalWithDiscount;
    try {
      ({data: {
        items,
        totalWithoutDiscount,
        totalWithDiscount,
      }} = (await this.$axios.get('cart/data')));
    } catch (exception) {
      //
    }
    commit('update', {
      items,
      totalWithoutDiscount,
      totalWithDiscount,
    });
  },
}
