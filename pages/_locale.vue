<template>
  <NuxtChild />
</template>

<script>
export default {
  async middleware({from, route, params, store, $axios, redirect, error}) {
    if ((route.name === 'locale') && !params.slug) {
      // fix to force working slug route for main page visiting from other slug page via nuxt-link (visiting via page refresh works fine)
      return redirect({name: 'slug', params: {...params}});
    }

    if (from && (from.params.locale === params.locale)) {
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
      if (language.slug !== params.locale) {
        return redirect(((route.name === 'locale') || (route.name === 'slug')) && !params.slug ?
          {name: 'slug', params: {locale: language.slug, slug: params.locale}} :
          {...route, params: {...params, locale: language.slug}});
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
