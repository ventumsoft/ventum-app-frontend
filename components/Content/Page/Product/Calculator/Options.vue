<template>
  <fragment>
    <ContentPageProductCalculatorOption
      v-for="option of options"
      v-if="
        (!Number(option.dependOptionId) || params.options?.[option.dependOptionId] && option.dependElementsIds?.find(dependElementId => (dependElementId === 'all') || (dependElementId == params.options[option.dependOptionId]))) &&
        (!Number(option.excludedOptionId) || !params.options?.[option.excludedOptionId] || !option.excludedElementsIds?.find(excludedElementId => (excludedElementId === 'all') || (excludedElementId == params.options[option.excludedOptionId])))
      "
      :key="option.id"
      :class="{'component-option': component}"
      :option="option"
      :params="params"
      :defaults="defaults"
    />
  </fragment>
</template>

<script>
export default {
  props: {
    params: {type: Object},
    defaults: {type: Object},
    options: {type: Array, required: true},
    component: {type: Boolean},
  },
}
</script>
