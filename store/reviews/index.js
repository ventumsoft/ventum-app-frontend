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
    params = {},
    append = false,
  } = {}) {
    commit('loading', true);

    let reviews, page, pages, count, averageRating;
    try {
      ({data: {
        data: reviews,
        pagination: {page, pages},
        reviewsCount: count,
        ratingValue: averageRating,
      }} = (await this.$axios.get('reviews', {
        params,
        showErrorPageOnException: true,
      })));
    } catch (exception) {
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
