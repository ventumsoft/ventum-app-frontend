<template>
  <li class="showcase-widget sub-menu" data-widget="MainthemTwoLevelMenu">
    <a href="#" @click.prevent>
      <div>{{ title }}</div>
    </a>
    <ul v-if="items?.length">
      <li v-for="item of items">
        <TheLink :to="item.link">
          <div>{{ item?.title }}</div>
        </TheLink>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    title: {type: String},
    items: {type: Array},
  },
}
</script>
