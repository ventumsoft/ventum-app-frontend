<template>
  <li v-if="languages?.length > 1" class="sub-menu">
    <a href="#" @click.prevent>
      <i class="icon-flag2"></i>
      {{ language.name }}
      <i class="icon-angle-down"></i>
    </a>
    <ul>
      <li
        v-for="iteratedLanguage in languages"
        v-if="iteratedLanguage.id !== language.id"
      >
        <NuxtLink
          :hreflang="iteratedLanguage.slug"
          :to="$page({...$route, params: {...$route.params, locale: iteratedLanguage.slug, slug: iteratedLanguage.pageSlug || $route.params.slug}})"
        >
          {{ iteratedLanguage.name }}
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('site', [
      'language',
      'languages',
    ]),
  },
}
</script>
