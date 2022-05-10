<template>
  <div class="showcase-widget" data-widget="MainthemHeaderCustomHtml" v-html="content"></div>
</template>

<script>
export default {
  props: {
    content: {type: String, default: ''},
  },
}
</script>
