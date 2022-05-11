<template>
  <li v-if="parentCount" class="sub-menu">
    <a href="#" @click.prevent>
      <i class="icon-globe"></i>
      {{ title }}
      <i class="icon-angle-down"></i>
    </a>
    <ul>
      <li
        v-for="(itemParent, indexParent) of parentItems"
        :key="indexParent"
        :class="{'sub-menu': !!childsItems[indexParent]?.length}"
      >
        <a :href="itemParent.link || '#'">
          {{ itemParent.title }}
          <i v-if="childsItems[indexParent]?.length" class="icon-angle-down"></i>
        </a>
        <ul v-if="childsItems[indexParent]?.length" id="topdplink">
          <li v-for="(itemChild, indexChild) of items.filter(item => item.parent_link === itemParent.title)" :key="indexChild">
            <a :href="itemChild.link">{{ itemChild.title }}</a>
          </li>
        </ul>
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
  computed: {
    parentCount() {
      return this.items.filter(item => item.parent_link).length;
    },
    parentItems() {
      return this.items.filter(item => !item.parent_link);
    },
    childsItems() {
      return this.parentItems.reduce((result, itemParent, indexParent) => {
        result[indexParent] = this.items.filter(item => item.parent_link === itemParent.title);
        return result;
      }, {});
    },
  },
}
</script>
