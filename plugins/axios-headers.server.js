export default function (context) {
  context.$axios.onRequest(config => {
    if (config.headers) {
      config.headers['X-Secret-Key'] = process.env.API_SECRET;
    }
  });
}
