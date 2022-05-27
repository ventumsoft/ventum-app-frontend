<template>
  <NuxtChild :key="$store.state.site.language.slug" />
</template>

<script>
export default {
  async middleware({route, params, store, $axios, redirect, error}) {
    if ((route.name === 'locale') && !params.slug) {
      // fix to force working slug route for main page visiting from other slug page via nuxt-link (visiting via page refresh works fine)
      return redirect({name: 'slug', params: {...params}});
    }

    if (store.state.site.language && (store.state.site.language.slug === params.locale)) {
      return;
    }

    try {
      const {data: {
        trans,
        settings,
        language,
        languages,
      }} = await $axios.get('common/data', {params: {locale: params.locale}});
      store.commit('site/update', {
        trans,
        settings,
        language,
        languages,
      });
      if (store.state.site.language.slug !== params.locale) {
        return redirect(((route.name === 'locale') || (route.name === 'slug')) && !params.slug ?
          {name: 'slug', params: {locale: store.state.site.language.slug, slug: params.locale}} :
          {...route, params: {...params, locale: store.state.site.language.slug}});
      }
    } catch (exception) {
      error({
        statusCode: exception.response.status,
        message: exception.response.statusText,
      });
    }

    try {
      const {data: {
        header,
        footer,
      }} = await $axios.get('common/widgets', {params: {locale: params.locale}});
      store.commit('widgets/update', {
        header,
        footer,
      });
    } catch (exception) {
      error({
        statusCode: exception.response.status,
        message: exception.response.statusText,
      });
    }
  },
}
</script>
