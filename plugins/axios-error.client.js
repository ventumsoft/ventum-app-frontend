export default function (context) {
  context.$axios.onError(error => {
    context?.$noty(error.response?.data?.message || error.message, 'error');
  });
}
