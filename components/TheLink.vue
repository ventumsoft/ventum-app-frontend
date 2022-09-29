<template>
  <component
    :is="
      withoutLinkIfEmpty && (!to || (to === '#')) && 'slot' ||
      (to === '#') && 'a' ||
      to && ((typeof to !== 'string') || !to.includes('://')) && 'NuxtLink' ||
      'a'
    "
    v-bind="
      withoutLinkIfEmpty && (!to || (to === '#')) && {} ||
      (to === '#') && {href: to} ||
      to && ((typeof to !== 'string') || !to.includes('://')) && {to} ||
      {}
    "
    @click.prevent
  ><slot></slot></component>
</template>

<script>
export default {
  props: {
    to: {type: [String, Object]},
    withoutLinkIfEmpty: {type: Boolean, default: false},
  },
}
</script>
