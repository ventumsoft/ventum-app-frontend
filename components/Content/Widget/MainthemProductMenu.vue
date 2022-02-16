<template>
  <li>
    <a href="#" @click.prevent>
      <div>{{ title }}</div>
    </a>
    <ContentWidgetMainthemProductMenuBranch
      v-if="tree?.length"
      :branch="tree[0]"
      :tree="tree"
    />
  </li>
</template>

<script>
export default {
  props: {
    title: {type: String},
    tree: {type: Array},
  },
}
</script>
