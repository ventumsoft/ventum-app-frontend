<template>
  <div class="showcase-widget col_half" data-widget="MainthemCopyrights" v-html="title"></div>
</template>

<script>
export default {
  props: {
    title: {type: String},
  },
}
</script>
