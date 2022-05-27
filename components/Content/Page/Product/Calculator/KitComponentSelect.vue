<template>
  <div class="col_full">
    <label class="text-break">{{ product.calculator.kitDisplayName || $trans('product.kit.product.select.part') }}</label>
    <Select2 name="params[productComponentId]">
      <option
        v-for="component of components"
        :value="component.id"
        :selected="((formData?.['params[productComponentId]'] !== undefined) ? formData['params[productComponentId]'] : product.calculator.defaults?.productComponentId) == component.id"
      >{{ component.name }}</option>
    </Select2>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'formData',
    'components',
  ],
  computed: {
    ...mapState('page', ['product']),
  },
}
</script>
