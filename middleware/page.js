export default async function ({$axios, route, store, redirect}) {
  const path = route.fullPath;

  const {data: {
    redirect: redirectUri,
    type,
    language,
    languages,
    widgets,
  }} = await $axios.get('page/data', {params: {path}});

  if (redirectUri) {
    return redirect(redirectUri);
  }

  store.commit('page/set', {
    path,
    type,
    language,
    languages,
    widgets,
  });
}
