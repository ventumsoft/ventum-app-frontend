<template>
  <fragment>
    <ContentPageProductCalculatorOption
      v-for="option of options"
      :key="option.id"
      :class="{'component-option': component}"
      v-bind="option"
    />
  </fragment>
</template>

<script>
export default {
  props: {
    options: {type: Array, required: true},
    component: {type: Boolean},
  },
}
</script>
