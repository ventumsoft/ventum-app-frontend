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

  if (route.params.locale !== language.slug) {
    return redirect({...route, params: {
      ...route.params,
        locale: language.slug,
        slug: !route.params.slug && route.params.locale || route.params.slug,
    }});
  }
}
