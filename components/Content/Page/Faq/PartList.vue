<template>
  <Fragment>
    <TheLink
      v-for="item of items"
      :key="item.id"
      class="faqtitle"
      style="width: 100%"
      :to="item.link"
    >
      <div>
        <i class="icon-caret-right"></i>
        {{ item.title }}
      </div>
    </TheLink>
  </Fragment>
</template>

<script>
export default {
  props: {
    items: {type: Array},
  },
}
</script>
