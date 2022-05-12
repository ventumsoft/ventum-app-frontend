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
}
