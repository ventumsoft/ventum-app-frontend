<template>
  <fragment>
    <input
      type="hidden"
      name="params[area_units]"
      :value="units"
    >
    <input
      type="hidden"
      name="params[width]"
      :value="width"
    >
    <input
      type="hidden"
      name="params[height]"
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
}
</script>
