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
  async fetchItems({commit, rootState}, {
    favorite = (rootState.page.type === 'FaqMain') || undefined,
    categoryId = (rootState.page.type === 'FaqCategory') && rootState.page.faqCategory?.id || (rootState.page.type === 'FaqItem') && Number(this.$router.currentRoute.query.category_id) || undefined,
  } = {}) {
    let items;
    try {
      items = (await this.$axios.get('faq/items', {
        params: {
          locale: rootState.site.language.slug,
          favorite,
          categoryId,
        },
      })).data;
    } catch (exception) {
      console.error(exception);
      return;
    }
    commit('setItems', items);
  },

  async fetchCategories({commit, rootState}) {
    let categories;
    try {
      categories = (await this.$axios.get('faq/categories', {
        params: {
          locale: rootState.site.language.slug,
        },
      })).data;
    } catch (exception) {
      console.error(exception);
      return;
    }
    commit('setCategories', categories);
  },
}
