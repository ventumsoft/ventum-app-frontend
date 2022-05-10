<template>
  <li>
    <a href="#" @click.prevent>
      <div>{{ title }}</div>
    </a>
    <ContentWidgetProductMenuBranch
      v-if="tree[0]"
      :branch="tree[0]"
      :tree="tree"
    />
  </li>
</template>

<script>
export default {
  props: {
    title: {type: String},
    tree: {type: Object},
  },
}
</script>
