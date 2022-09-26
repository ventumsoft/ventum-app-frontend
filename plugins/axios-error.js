export default function (context) {
  context.$axios.onError(exception => {
    if (exception?.config?.showErrorPageOnException) {
      if (context.store) {
        context.store.commit('site/update', {preload: null, ...context.store.state.site.preload});
        context.store.commit('widgets/update', {preload: null, ...context.store.state.widgets.preload});
      }
      context.error({
        statusCode: exception.response?.status || 500,
        message: exception.response?.statusText || exception.message,
      });
      return;
    }

    if (context.$noty && !exception?.config?.silenceException) {
      context.$noty(exception.response?.data?.message || exception.message, 'error');
    }
  });
}
