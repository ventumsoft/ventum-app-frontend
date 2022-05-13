export default async function ({$axios, route, store, redirect}) {
  const path = route.path;
  const query = route.query;

  if (path === store.state.page.path) {
    return;
  }

  const {data: {
    redirect: redirectUri,
    trans,
    settings,
    language,
    languages,
    widgets,
    data,
  }} = await $axios.get('page/data', {params: {path, ...query}});

  if (redirectUri) {
    return redirect(redirectUri);
  }

  store.commit('site/set', {
    trans,
    settings,
    language,
    languages,
    widgets,
  });

  store.commit('page/set', {path, ...data});

  if ((store.state.page.type === 'BlogMain') ||
    (store.state.page.type === 'BlogCategory')
  ) {
    await store.dispatch('blog/fetchArticles');
  }

  if ((store.state.page.type === 'BlogMain') ||
    (store.state.page.type === 'BlogCategory') ||
    (store.state.page.type === 'BlogArticle')
  ) {
    await Promise.all([
      !store.state.blog.categories && store.dispatch('blog/fetchCategories'),
      !store.state.blog.recentArticles && store.dispatch('blog/fetchRecentArticles'),
    ].filter(v => v));
  }

  if ((store.state.page.type === 'FaqMain') ||
    (store.state.page.type === 'FaqCategory')
  ) {
    await store.dispatch('faq/fetchItems');
  }

  if (store.state.page.type === 'FaqItem') {
    if (query.category_id) {
      await store.dispatch('faq/fetchItems');
    } else {
      store.commit('faq/setItems', null);
    }
  }

  if ((store.state.page.type === 'FaqMain') ||
    (store.state.page.type === 'FaqCategory') ||
    (store.state.page.type === 'FaqItem')
  ) {
    await Promise.all([
      !store.state.faq.categories && store.dispatch('faq/fetchCategories'),
    ].filter(v => v));
  }
}
