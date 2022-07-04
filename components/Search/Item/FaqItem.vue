<template>
  <div class="site-search-result-item">
    <TheLink :to="faqItem.link">
      &bullet;
      {{ faqItem.title }}
    </TheLink>
  </div>
</template>

<script>
export default {
  props: ['faqItem'],
}
</script>
