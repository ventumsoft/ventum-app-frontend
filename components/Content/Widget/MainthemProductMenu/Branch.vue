<template>
  <ul v-if="branch?.categories?.length || branch?.products?.length">
    <template v-if="branch.categories?.length">
      <li v-for="category of branch.categories">
        <NuxtLink v-if="category.link && !category.link?.includes('://')" :to="category.link">
          <div>{{ category.name }}</div>
        </NuxtLink>
        <a v-else :href="category.link">
          <div>{{ category.name }}</div>
        </a>
        <ContentWidgetMainthemProductMenuBranch
          v-if="tree[category.id]"
          :branch="tree[category.id]"
          :tree="tree"
        />
      </li>
    </template>
    <template v-if="branch.products?.length">
      <li v-for="product of branch.products">
        <NuxtLink v-if="product.link && !product.link?.includes('://')" :to="product.link">
          <div>{{ product.name }}</div>
        </NuxtLink>
        <a v-else :href="product.link">
          <div>{{ product.name }}</div>
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    branch: {type: Object},
    tree: {type: Array},
  },
}
</script>
