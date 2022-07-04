<template>
  <div class="site-search-result-item">
    <TheLink :to="product.link">
      <img
        v-if="product.image"
        :src="product.image"
        :srcset="product.image2x && (product.image + ', ' + product.image2x + ' 2x')"
        :alt="product.name"
      >
      <template v-else>
        &bullet;
      </template>
      {{ product.name }}
      <div class="price text-muted">{{ product.price }}</div>
    </TheLink>
  </div>
</template>

<script>
export default {
  props: ['product'],
}
</script>
