<template>
  <div id="logo" class="showcase-widget" data-widget="MainthemLogo">
    <TheLink :to="$page({name: 'index'})" class="universal-logo hidden-xs">
      <img
        :src="image || '/images/no-logo.png'"
        :srcset="(image || '/images/no-logo.png') + ', ' + (image2x || '/images/no-logo.png') + ' 2x'"
        :alt="$trans('widgets.content-widgets.logo.big-logo-img-alt')"
      >
    </TheLink>
    <TheLink :to="$page({name: 'index'})" class="universal-logo hidden-sm hidden-md hidden-lg">
      <img
        :src="mobileImage || '/images/no-logo.png'"
        :srcset="(mobileImage || '/images/no-logo.png') + ', ' + (mobileImage2x || '/images/no-logo.png') + ' 2x'"
        :alt="$trans('widgets.content-widgets.logo.big-logo-img-alt')"
      >
    </TheLink>
  </div>
</template>

<script>
export default {
  props: {
    image: {type: String},
    image2x: {type: String},
    mobileImage: {type: String},
    mobileImage2x: {type: String},
  },
}
</script>
