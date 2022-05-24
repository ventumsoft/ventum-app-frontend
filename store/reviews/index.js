export const state = () => ({
  loading: false,
  page: null,
  pages: null,
  reviews: null,
  count: null,
  averageRating: null,
});

export const mutations = {
  loading: (state, value) =>
    void (state.loading = value),
  set(state, {
    page,
    pages,
    reviews,
    count,
    averageRating,
    append,
  }) {
    state.reviews = (append && state.page && (page === state.page + 1)) ?
      [...state.reviews, ...reviews] :
      reviews;
    state.page = page;
    state.pages = pages;
    state.count = count;
    state.averageRating = averageRating;
    state.loading = false;
  },
}

export const actions = {
  async fetch({commit, rootState}, {
    page,
    append = false,
  } = {}) {
    commit('loading', true);

    let reviews, pages, count, averageRating;
    try {
      const response = (await this.$axios.get('reviews', {
        params: {
          locale: rootState.site.language.slug,
          page,
        },
      })).data;
      reviews = response.data;
      pages = response.pagination.pages;
      count = response.reviewsCount;
      averageRating = response.ratingValue;
    } catch (exception) {
      console.error(exception);
      return;
    } finally {
      commit('loading', false);
    }

    commit('set', {
      page,
      pages,
      reviews,
      count,
      averageRating,
      append,
    });
  },
}
