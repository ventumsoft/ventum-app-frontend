<template>
  <NuxtChild />
</template>

<script>
export default {
  async middleware({from, route, params, store, $axios, redirect}) {
    if ((route.name === 'locale') && !params.slug) {
      // fix to force working slug route for main page visiting from other slug page via nuxt-link (visiting via page refresh works fine)
      return redirect({name: 'slug', params: {...params}});
    }

    if (from && (from.params.locale === params.locale)) {
      return;
    }

    const {data: {
      trans,
      settings,
      language,
      languages,
    }} = await $axios.get('common/data', {
      headers: {
        common: {
          'Accept-Language': params.locale || '*',
        },
      },
    });
    store.commit('site/update', {
      trans,
      settings,
      language,
      languages,
    });
    if (language.slug !== params.locale) {
      return redirect(((route.name === 'locale') || (route.name === 'slug')) && !params.slug ?
        {name: 'slug', params: {locale: language.slug, slug: params.locale}, query: route.query} :
        {...route, params: {...params, locale: language.slug}, query: route.query});
    }

    const {data: {
      header,
      footer,
    }} = await $axios.get('common/widgets', {
      headers: {
        common: {
          'Accept-Language': params.locale || '*',
        },
      },
    });
    store.commit('widgets/update', {
      header,
      footer,
    });
  },
}
</script>
