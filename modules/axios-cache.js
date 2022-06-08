import { setupCache } from 'axios-cache-adapter';

export default function () {
  const cache = setupCache({
    maxAge: 5 * 60 * 1000,
    exclude: {
      query: false,
      filter: req => (req.url !== 'common/data') && (req.url !== 'common/widgets'),
    },
  });

  this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
    ssrContext.$axiosCache = cache;
  });
}
