<template>
  <component
    :is="'ContentWidget' + widget.name"
    v-bind="widget.data"
  ></component>
</template>

<script>
export default {
  props: {
    widget: {
      type: Object,
      props: {
        name: {type: String, required: true},
        id: {type: Number, required: true},
        data: {type: Object},
      },
    }
  },
}
</script>
