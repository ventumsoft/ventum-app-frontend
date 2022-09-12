import qs from 'qs';

export default function ({$axios}) {
  $axios.onRequest(config => {
    config.paramsSerializer = params => qs.stringify(params);
    return config;
  });
}
