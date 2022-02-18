export default async function ({$axios, route, store, redirect}) {
  const path = route.path;
  const query = route.query;

  const {data: {
    redirect: redirectUri,
    language,
    languages,
    widgets,
    type,
    entity,
  }} = await $axios.get('page/data', {params: {path, ...query}});

  if (redirectUri) {
    return redirect(redirectUri);
  }

  store.commit('page/set', {
    path,
    language,
    languages,
    widgets,
    type,
    entity,
  });
}
