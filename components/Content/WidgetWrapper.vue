<template>
  <component
    :is="'ContentWidget' + name"
    :bind="data"
  ></component>
</template>

<script>
export default {
  props: {
    name: {type: String, required: true},
    data: {type: Object, required: true},
  },
}
</script>
