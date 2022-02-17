<template>
  <Fragment>
    <slot v-if="withoutLinkIfEmpty && (!to || (to === '#'))"></slot>
    <NuxtLink v-else-if="to && !to?.includes('://')" :to="to" :class="$vnode.data.staticClass"><slot></slot></NuxtLink>
    <a v-else :href="to" :class="$vnode.data.staticClass"><slot></slot></a>
  </Fragment>
</template>

<script>
import {Fragment} from 'vue-frag';

export default {
  components: {
    Fragment,
  },
  props: {
    to: {type: String},
    withoutLinkIfEmpty: {type: Boolean, default: false},
  },
}
</script>
