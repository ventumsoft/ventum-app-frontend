export default async function (context) {
  const {from, route, params, query, redirect, error, $axios, res, ssrContext} = context;

  if (!process.server) {
    redirect(from);
    window.location.href = route.fullPath;
    return;
  }

  const apiEndpointBuilder = route.meta?.find(meta => meta?.apiEndpointBuilder)?.apiEndpointBuilder;
  if (!apiEndpointBuilder) {
    return error({
      statusCode: 500,
      message: 'API-endpoint builder for creator page not specified.',
    });
  }

  try {
    const {data} = await $axios.get(apiEndpointBuilder(params), {params: query, showErrorPageOnException: true});
    res.end(data);
    ssrContext.redirected = true;
  } catch (exception) {
    return;
  }
}
