<template>
  <NuxtChild />
</template>

<script>
export default {
  async middleware({from, route, params, store, $axios, redirect}) {
    if ((route.name === 'index') && !params.slug) {
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
    }} = await $axios.get('common/data');
    store.commit('site/preload', {
      trans,
      settings,
      language,
      languages,
    });

    const localePrefixToBe = (languages?.length > 1) && (language?.id !== settings?.['general:disable-language-in-url']) ?
      language.slug :
      undefined;

    if (localePrefixToBe !== params.locale) {
      return redirect({...route, params: {...params, locale: localePrefixToBe}, query: route.query});
    }

    const {data: {
      header,
      footer,
    }} = await $axios.get('common/widgets');
    store.commit('widgets/preload', {
      header,
      footer,
    });

    if (process.server) {
      store.commit('site/update', {preload: null, ...store.state.site.preload});
      store.commit('widgets/update', {preload: null, ...store.state.widgets.preload});
    }
  },
  async asyncData({store}) {
    store.commit('site/update', {preload: null, ...store.state.site.preload});
    store.commit('widgets/update', {preload: null, ...store.state.widgets.preload});
  },
  layout({route}) {
    if (route.name === 'auth/login-frame') {
      return 'frame';
    }
    return 'default';
  },
}
</script>
