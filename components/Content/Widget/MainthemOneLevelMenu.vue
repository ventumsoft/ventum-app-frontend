<template>
  <li class="showcase-widget" data-widget="MainthemOneLevelMenu">
    <NuxtLink v-if="link && !link?.includes('://')" :to="link">
      <div>{{ title }}</div>
    </NuxtLink>
    <a v-else :href="link">
      <div>{{ title }}</div>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    title: {type: String},
    link: {type: String},
  },
}
</script>
