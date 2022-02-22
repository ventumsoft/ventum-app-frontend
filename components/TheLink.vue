<template>
  <Fragment>
    <slot v-if="withoutLinkIfEmpty && (!to || (to === '#'))"></slot>
    <a v-else-if="to === '#'" :href="to" :class="$vnode.data.staticClass" @click.prevent><slot></slot></a>
    <NuxtLink v-else-if="to && !to?.includes('://')" :to="to" :class="$vnode.data.staticClass"><slot></slot></NuxtLink>
    <a v-else :href="to" :class="$vnode.data.staticClass"><slot></slot></a>
  </Fragment>
</template>

<script>
export default {
  props: {
    to: {type: String},
    withoutLinkIfEmpty: {type: Boolean, default: false},
  },
}
</script>
