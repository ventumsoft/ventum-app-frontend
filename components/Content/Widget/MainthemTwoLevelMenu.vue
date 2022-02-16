<template>
  <li class="showcase-widget" data-widget="MainthemTwoLevelMenu">
    <a href="#" @click.prevent>
      <div>{{ title }}</div>
    </a>
    <ul v-if="items?.length">
      <li v-for="item of items">
        <NuxtLink v-if="item?.link && !item.link?.includes('://')" :to="item.link">
          <div>{{ item?.title }}</div>
        </NuxtLink>
        <a v-else :href="item.link">
          <div>{{ item?.title }}</div>
        </a>
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
