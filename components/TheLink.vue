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
      (to === '#') && {href: to, class: $vnode.data.class || $vnode.data.staticClass, style: $vnode.data.style} ||
      to && ((typeof to !== 'string') || !to.includes('://')) && {to, class: $vnode.data.class || $vnode.data.staticClass, style: $vnode.data.style} ||
      {class: $vnode.data.class || $vnode.data.staticClass, style: $vnode.data.style}
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
