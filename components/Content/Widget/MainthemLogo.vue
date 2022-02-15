<template>
  <div id="logo" class="showcase-widget" data-widget="MainthemLogo">
    <NuxtLink :to="link" class="universal-logo hidden-xs">
      <img
        :src="image || '/images/no-logo.png'"
        :srcset="(image || '/images/no-logo.png') + ', ' + (image2x || '/images/no-logo.png') + ' 2x'"
        :alt="alt"
      >
    </NuxtLink>
    <NuxtLink :to="link" class="universal-logo hidden-sm hidden-md hidden-lg">
      <img
        :src="mobileImage || '/images/no-logo.png'"
        :srcset="(mobileImage || '/images/no-logo.png') + ', ' + (mobileImage2x || '/images/no-logo.png') + ' 2x'"
        :alt="alt"
      >
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    link: {type: String},
    image: {type: String},
    image2x: {type: String},
    mobileImage: {type: String},
    mobileImage2x: {type: String},
    alt: {type: String},
  },
}
</script>
