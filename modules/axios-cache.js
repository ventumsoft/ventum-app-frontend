import { setupCache } from 'axios-cache-adapter';
import { serializeQuery } from 'axios-cache-adapter/src/cache';
import md5 from 'md5';

export default function () {
  const cache = setupCache({
    maxAge: 1 * 60 * 1000,
    key: req => {
      const url = `${req.baseURL ? req.baseURL : ''}${req.url}`;
      const locale = req.headers?.['Accept-Language'];
      return url + serializeQuery(req) +
        ((locale || req.data) ? '#' : '') +
        (locale ? locale : '') +
        (req.data ? md5(req.data) : '');
    },
    exclude: {
      query: false,
      filter: req => (req.url !== 'common/data') && (req.url !== 'common/widgets'),
    },
  });

  this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
    ssrContext.$axiosCache = cache;
  });
}
