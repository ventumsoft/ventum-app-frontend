export default async function ({$axios, route, store, redirect}) {
  const path = route.path;
  const query = route.query;

  const {data: {
    redirect: redirectUri,
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
    settings,
    language,
    languages,
    widgets,
  });

  store.commit('page/set', data);
}
