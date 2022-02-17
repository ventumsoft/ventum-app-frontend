<template>
  <li v-if="languages?.length > 1">
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
          :to="iteratedLanguage?.localizedCurrentUrl || ('/' + iteratedLanguage.slug)"
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
    ...mapState('page', [
      'language',
      'languages',
    ]),
  },
}
</script>
