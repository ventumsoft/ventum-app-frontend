export const state = () => ({
  loading: false,
  page: null,
  pages: null,
  articles: null,
});

export const mutations = {
  loading: (state, value) =>
    void (state.loading = value),
  set(state, {
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
  }
}

export const actions = {
  async fetch({commit, rootState}, {
    page = 1,
    append = false,
  } = {}) {
    commit('loading', true);

    let articles, pages;
    try {
      const response = (await this.$axios.get('blog/articles', {
        params: {
          locale: rootState.site.language.slug,
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

    commit('set', {
      page,
      pages,
      articles,
      append,
    });
  },
}
