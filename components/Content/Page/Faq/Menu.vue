<template>
  <div class="sidebar clearfix">
    <ul class="faq-filter clearfix">
      <li v-for="iteratedCategory of categories" :class="{activeFilter: iteratedCategory.id === currentCategoryId}">
        <TheLink :to="iteratedCategory.link">
          {{ iteratedCategory.title }}
        </TheLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {type: Array},
    currentCategoryId: {type: Number},
  },
}
</script>
