export default async function ({$axios, route, store, redirect}) {
  const locale = route.params.locale || store.state.site.language?.slug || null;
  const slug = (route.name === 'slug') ? (route.params.slug || '') : null;

  if (locale &&
    (locale === (store.state.site.language?.slug || null)) &&
    (slug === store.state.page.slug)
  ) {
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
  }} = await $axios.get('page/data', {params: {locale, slug, ...route.query}});

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

  store.commit('page/set', {slug, ...data});

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
    await store.dispatch('faq/fetchItems', {
      favorite: (store.state.page.type === 'FaqMain') || undefined,
      categoryId: (store.state.page.type === 'FaqCategory') && store.state.page.faqCategory?.id || undefined,
    });
  }

  if (store.state.page.type === 'FaqItem') {
    if (route.query.category_id) {
      await store.dispatch('faq/fetchItems', {
        categoryId: route.query.category_id || undefined,
      });
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

  if (route.params.locale !== language.slug) {
    return redirect({...route, params: {
      ...route.params,
        locale: language.slug,
        slug: !route.params.slug && route.params.locale || route.params.slug,
    }});
  }
}
