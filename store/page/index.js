export const state = () => ({
  slug: null,
  type: null,
  page: null,
  productCategory: null,
  product: null,
  blogCategory: null,
  blogArticle: null,
  faqCategory: null,
  faqItem: null,
  slugsByLanguages: null,
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
