export default function (context) {
  context.$axios.onRequest(config => {
    if (config.headers?.common && !config.headers?.common?.['Accept-Language'] && context.params?.locale) {
      config.headers.common['Accept-Language'] = context.params.locale;
    }
  });
}
