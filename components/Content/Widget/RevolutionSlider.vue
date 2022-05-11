<template>
  <fragment>
    <section
      id="slider"
      class="showcase-widget slider-parallax revslider-wrap ohidden clearfix"
      data-widget="MainthemRevolutionSlider"
      v-html="slider_code"
    ></section>
    <style type="text/css" v-html="slider_styles"></style>
  </fragment>
</template>

<script>
export default {
  props: {
    slider_code: {type: String},
    slider_styles: {type: String},
  },
}
</script>
