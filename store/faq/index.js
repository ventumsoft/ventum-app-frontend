export const state = () => ({
  items: null,
  categories: null,
});

export const mutations = {
  setItems: (state, items) =>
    void (state.items = items),
  setCategories: (state, categories) =>
    void (state.categories = categories),
}

export const actions = {
  async fetchItems({commit, rootState}, {favorite, categoryId} = {}) {
    let items;
    try {
      ({data: items} = (await this.$axios.get('faq/items', {
        params: {
          favorite,
          categoryId,
        },
        showErrorPageOnException: true,
      })));
    } catch (exception) {
      return;
    }
    commit('setItems', items);
  },

  async fetchCategories({commit}) {
    let categories;
    try {
      ({data: categories} = (await this.$axios.get('faq/categories', {showErrorPageOnException: true})));
    } catch (exception) {
      return;
    }
    commit('setCategories', categories);
  },
}
