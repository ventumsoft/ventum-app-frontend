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
    'units',
    'width',
    'height',
  ],
  mounted() {
    this.$store.commit('product/setParamsValue', {key: 'area_units', value: this.units});
    this.$store.commit('product/setParamsValue', {key: 'width', value: Number(this.width)});
    this.$store.commit('product/setParamsValue', {key: 'height', value: Number(this.height)});
  },
  destroyed() {
    for (const key of ['area_units', 'width', 'height']) {
      this.$store.commit('product/setParamsValue', {key, value: undefined});
    }
  },
}
</script>
