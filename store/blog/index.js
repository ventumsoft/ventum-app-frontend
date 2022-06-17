export const state = () => ({
  loading: false,
  page: null,
  pages: null,
  articles: null,
  categories: null,
  recentArticles: null,
});

export const mutations = {
  loading: (state, value) =>
    void (state.loading = value),
  setArticles(state, {
    page,
    pages,
    articles,
    append,
  }) {
    state.articles = (append && state.page && (page === state.page + 1)) ?
      [...state.articles, ...articles] :
      articles;
    state.page = page;
    state.pages = pages;
    state.loading = false;
  },
  setCategories: (state, categories) =>
    void (state.categories = categories),
  setRecentArticles: (state, articles) =>
    void (state.recentArticles = articles),
}

export const actions = {
  async fetchArticles({commit, rootState}, {
    page = 1,
    categoryId = undefined,
    append = false,
  } = {}) {
    commit('loading', true);

    let articles, pages;
    try {
      ({data: {data: articles, pagination: {pages}}} = (await this.$axios.get('blog/articles', {
        params: {
          categoryId,
          page,
        },
        showErrorPageOnException: true,
      })));
    } catch (exception) {
      return;
    } finally {
      commit('loading', false);
    }

    commit('setArticles', {
      page,
      pages,
      articles,
      append,
    });
  },

  async fetchCategories({commit}) {
    let categories;
    try {
      ({data: categories} = (await this.$axios.get('blog/categories', {showErrorPageOnException: true})));
    } catch (exception) {
      return;
    }
    commit('setCategories', categories);
  },

  async fetchRecentArticles({commit}) {
    let articles;
    try {
      ({data: articles} = (await this.$axios.get('blog/recent', {showErrorPageOnException: true})));
    } catch (exception) {
      return;
    }
    commit('setRecentArticles', articles);
  },
}
