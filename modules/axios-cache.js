import { setupCache } from 'axios-cache-adapter';
import { serializeQuery } from 'axios-cache-adapter/src/cache';
import md5 from 'md5';

const cacheMaxAge = 1 * 60 * 1000;
const cacheableEndpoints = ['common/data', 'common/widgets'];

export default function () {
  const cache = setupCache({
    maxAge: cacheMaxAge,
    key: req => {
      const url = `${req.baseURL ? req.baseURL : ''}${req.url}`;
      const locale = req.headers?.['Accept-Language'];
      const token = req.headers?.['X-Visiting-From-Admin-Token'];
      return url + serializeQuery(req) +
        ((locale || token || req.data) ? '#' : '') +
        (locale ? locale : '') +
        (token ? token : '') +
        (req.data ? md5(req.data) : '');
    },
    exclude: {
      query: false,
      filter: req => !cacheableEndpoints.includes(req.url),
    },
  });

  this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
    ssrContext.$axiosCache = cache;
  });

  const preCacheCommonDataRequests = async () => {
    try {
      const {data: {languages}} = await cache.adapter({
        url: 'common/data',
        method: 'GET',
        baseURL: process.env.API_URL,
        headers: {'X-Secret-Key': process.env.API_SECRET},
      });
      await Promise.all(languages.reduce((result, language) => {
        for (const url of cacheableEndpoints) {
          result.push(cache.adapter({
            url,
            method: 'GET',
            baseURL: process.env.API_URL,
            headers: {'X-Secret-Key': process.env.API_SECRET, 'Accept-Language': language.slug},
          }));
        }
        return result;
      }, []));
    } catch (exception) {
      console.error(exception);
    } finally {
      setTimeout(preCacheCommonDataRequests, cacheMaxAge);
    }
  };
  preCacheCommonDataRequests();
}
