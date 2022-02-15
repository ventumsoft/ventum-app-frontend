<template>
  <component
    :is="'ContentWidget' + name"
    v-bind="data"
  ></component>
</template>

<script>
export default {
  props: {
    name: {type: String, required: true},
    data: {type: Object},
  },
}
</script>
