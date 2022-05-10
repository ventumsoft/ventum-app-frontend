<template>
  <div>
    <div class="heading-block">
      <h3 v-html="title"></h3>
      <span v-html="subtitle"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    subtitle: {type: String},
  },
}
</script>
