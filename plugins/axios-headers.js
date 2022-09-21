export default function (context) {
  context.$axios.onRequest(config => {
    if (config.headers?.common && !config.headers?.common?.['Accept-Language'] && context.params?.locale) {
      config.headers.common['Accept-Language'] = context.params.locale;
    }
    const visitingFromAdminToken = (typeof localStorage !== 'undefined') && localStorage?.visitingFromAdminToken ||
      context.query?.visitingFromAdminToken ||
      null;
    if (visitingFromAdminToken) {
      if (config.headers?.common) {
        config.headers.common['X-Visiting-From-Admin-Token'] = visitingFromAdminToken;
      }
    }
  });
}
