export const state = () => ({
  path: null,
  type: null,
  page: null,
  productCategory: null,
  product: null,
  blogCategories: null,
  blogRecentArticles: null,
  blogCategory: null,
  blogArticle: null,
  faqCategory: null,
  faqItem: null,
  faqCategories: null,
  faqItems: null,
});

export const mutations = {
  set(state, data) {
    for (const key in state) {
      state[key] = data[key];
    }
  },
}

export const getters = {
  entity: state => ({
    Static: state.page,
    Custom: state.page,
    ProductCategory: state.productCategory,
    Product: state.product,
    BlogMain: state.page,
    BlogCategory: state.blogCategory,
    BlogArticle: state.blogArticle,
    FaqMain: state.page,
    FaqCategory: state.faqCategory,
    FaqItem: state.faqItem,
  }[state.type]),
}
