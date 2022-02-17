<template>
  <li class="showcase-widget" data-widget="MainthemOneLevelMenu">
    <TheLink :to="link">
      <div>{{ title }}</div>
    </TheLink>
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
