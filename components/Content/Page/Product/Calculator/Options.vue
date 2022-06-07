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
      :defaults="defaults"
    />
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: {
    defaults: {type: Object},
    options: {type: Array, required: true},
    component: {type: Boolean},
  },
  computed: {
    ...mapState('product', ['params']),
  },
}
</script>
