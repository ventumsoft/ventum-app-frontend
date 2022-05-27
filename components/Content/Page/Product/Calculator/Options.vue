<template>
  <fragment>
    <ContentPageProductCalculatorOption
      v-for="option of options"
      :key="option.id"
      :class="{'component-option': component}"
      :formData="formData"
      v-bind="option"
    />
  </fragment>
</template>

<script>
export default {
  props: {
    formData: {type: Object},
    options: {type: Array, required: true},
    component: {type: Boolean},
  },
}
</script>
