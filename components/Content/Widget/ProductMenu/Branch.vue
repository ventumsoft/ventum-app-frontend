<template>
  <ul v-if="branch?.categories?.length || branch?.products?.length">
    <template v-if="branch.categories?.length">
      <li v-for="category of branch.categories" :class="{'sub-menu': tree[category.id]}">
        <TheLink :to="category.link">
          <div>{{ category.name }}</div>
        </TheLink>
        <ContentWidgetProductMenuBranch
          v-if="tree[category.id]"
          :branch="tree[category.id]"
          :tree="tree"
        />
      </li>
    </template>
    <template v-if="branch.products?.length">
      <li v-for="product of branch.products">
        <TheLink :to="product.link">
          <div>{{ product.name }}</div>
        </TheLink>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    branch: {type: Object},
    tree: {type: Object},
  },
}
</script>
