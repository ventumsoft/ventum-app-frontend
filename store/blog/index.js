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
    page = Number(this.$router.currentRoute.query.page) || 1,
    categoryId = rootState.page.blogCategory?.id,
    append = false,
  } = {}) {
    commit('loading', true);

    let articles, pages;
    try {
      const response = (await this.$axios.get('blog/articles', {
        params: {
          locale: rootState.site.language.slug,
          categoryId,
          page,
        },
      })).data;
      articles = response.data;
      pages = response.meta.last_page;
    } catch (exception) {
      console.error(exception);
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

  async fetchCategories({commit, rootState}) {
    let categories;
    try {
      categories = (await this.$axios.get('blog/categories', {
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

  async fetchRecentArticles({commit, rootState}) {
    let articles;
    try {
      articles = (await this.$axios.get('blog/recent', {
        params: {
          locale: rootState.site.language.slug,
        },
      })).data;
    } catch (exception) {
      console.error(exception);
      return;
    }
    commit('setRecentArticles', articles);
  },
}
