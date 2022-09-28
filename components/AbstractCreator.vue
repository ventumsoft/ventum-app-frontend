<template>
  <fragment>
    <template v-if="error">
      <PageTitle
        :title="$trans('creators.' + error + '.h1')"
        :breadcrumbs="[
          {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
          {title: $trans('creators.' + error + '.breadcrumb')},
        ]"
      />
      <section id="content">
        <div class="content-wrap">
          <div class="container clearfix">
            <div id="processTabs" style="margin-top: 30px;">
              <div class="alert alert-warning">
                {{ $trans('creators.' + error + '.alert') }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </fragment>
</template>

<script>
export default {
  async asyncData (context) {
    const {from, route, params, query, redirect, error, $axios, res, ssrContext} = context;

    if (!process.server) {
      redirect(from);
      window.location.href = route.fullPath;
      return;
    }

    const apiEndpointBuilder = route.meta?.find(meta => meta?.apiEndpointBuilder)?.apiEndpointBuilder;
    if (!apiEndpointBuilder) {
      error({
        statusCode: 500,
        message: 'API-endpoint builder for creator page not specified.',
      });
      return;
    }

    let data;
    try {
      ({data} = await $axios.get(apiEndpointBuilder(params), {params: query, showErrorPageOnException: true}));
    } catch (exception) {
      return;
    }

    if (typeof data === 'string') {
      res.end(data);
      ssrContext.redirected = true;
      return;
    }

    if (data?.redirectUrl) {
      redirect(data.redirectUrl);
      return;
    }

    if (data?.error) {
      return {error: data.error};
    }

    error({
      statusCode: 500,
      message: 'Bad response from creator page request.',
    });
  },

  head() {
    return this.error && {
      title: this.$trans('creators.' + this.error + '.title'),
    };
  },
}
</script>
