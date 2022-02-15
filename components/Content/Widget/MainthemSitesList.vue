<template>
  <li v-if="parentCount">
    <a href="#" @click.prevent><i class="icon-globe"></i> {{ title }}</a>
    <ul>
      <li v-for="(itemParent, indexParent) of items.filter(item => !item.parent_link)" :key="indexParent">
        <a :href="itemParent.link">{{ itemParent.title }}</a>
        <ul v-if="items.filter(item => item.parent_link === itemParent.title).length" id="topdplink">
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
  },
}
</script>
