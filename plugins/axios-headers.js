export default function ({$axios, store, params}) {
  $axios.onRequest(config => {
    //if (!config.headers.common['Accept-Language'] && params?.locale) {
    //  config.headers.common['Accept-Language'] = params.locale;
    //}
    if (!config.headers.common['Accept-Language'] && store.state.site.language) {
      config.headers.common['Accept-Language'] = store.state.site.language.slug;
    }
  });
}
