<template>
  <fragment>
    <input
      type="hidden"
      :value="units"
    >
    <input
      type="hidden"
      :value="width"
    >
    <input
      type="hidden"
      :value="height"
    >
  </fragment>
</template>

<script>
export default {
  props: [
    'params',
    'units',
    'width',
    'height',
  ],
  mounted() {
    this.$set(this.params, 'area_units', this.units);
    this.$set(this.params, 'width', this.width);
    this.$set(this.params, 'height', this.height);
  },
  destroyed() {
    this.$delete(this.params, 'area_units');
    this.$delete(this.params, 'width');
    this.$delete(this.params, 'height');
  },
}
</script>
