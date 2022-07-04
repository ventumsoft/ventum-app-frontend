<template>
  <div class="site-search-result-item">
    <TheLink :to="$page({name: 'reviews', query: {toReviewId: review.id}})">
      <img
        v-if="review.avatar"
        :src="review.avatar"
        :srcset="review.avatar2x && (review.avatar + ', ' + review.avatar2x + ' 2x')"
        :alt="review.customer_name"
      >
      <template v-else>
        &bullet;
      </template>
      {{ review.review }}
    </TheLink>
  </div>
</template>

<script>
export default {
  props: ['review'],
}
</script>
