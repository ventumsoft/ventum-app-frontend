<template>
  <div class="site-search-result-item">
    <TheLink :to="page.link">
      &bullet;
      {{ page.title }}
    </TheLink>
  </div>
</template>

<script>
export default {
  props: ['page'],
}
</script>
