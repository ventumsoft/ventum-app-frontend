export default function (context) {
  context.$axios.onError(exception => {
    if (exception?.config?.showErrorPageOnException) {
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
