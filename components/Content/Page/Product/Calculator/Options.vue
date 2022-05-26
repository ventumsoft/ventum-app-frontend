<template>
  <fragment>
    <ContentPageProductCalculatorOption
      v-for="option of options"
      :key="option.id"
      v-bind="option"
    />
  </fragment>
</template>

<script>
export default {
  props: {
    options: {type: Array},
  },
}
</script>
