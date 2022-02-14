export default async function ({$axios, route, store, redirect}) {
  const path = route.fullPath;

  const data = (await $axios.get('page/data', {params: {path}})).data;

  if (data.redirect) {
    return redirect(data.redirect);
  }

  store.commit('page/set', {path, data});
}
