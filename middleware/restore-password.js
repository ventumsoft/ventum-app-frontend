export default async function ({ route, $auth, $axios, store, redirect }) {
  if (route.query.restorePasswordEmail && route.query.restorePasswordCode) {
    if ($auth.user && !$auth.user.isTemporary) {
      if ($auth.user.email === route.query.restorePasswordEmail) {
        return redirect({name: 'user/profile'});
      } else {
        await $auth.logout();
      }
    }
    const {data: {result}} = await $axios.post('recovery/check', {
      email: route.query.restorePasswordEmail,
      code: route.query.restorePasswordCode,
    });
    store.commit('recovery/set', {
      email: route.query.restorePasswordEmail,
      code: route.query.restorePasswordCode,
      check: result,
    });
  }
}
