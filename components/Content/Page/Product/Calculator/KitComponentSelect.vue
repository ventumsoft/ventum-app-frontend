<template>
  <div class="col_full">
    <label class="text-break">{{ product.calculator.kitDisplayName || $trans('product.kit.product.select.part') }}</label>
    <Select2 @input="params.productComponentId = Number($event)">
      <option
        v-for="component of components"
        :value="component.id"
        :selected="value == component.id"
      >{{ component.name }}</option>
    </Select2>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'params',
    'defaults',
    'components',
  ],
  computed: {
    ...mapState('page', ['product']),
    value() {
      if (this.params.productComponentId !== undefined) {
        return this.params.productComponentId;
      }
      if (this.defaults?.productComponentId !== undefined) {
        return this.defaults.productComponentId;
      }
      return this.components[0]?.id;
    },
  },
  mounted() {
    this.$set(this.params, 'productComponentId', Number(this.value));
  },
  destroyed() {
    this.$delete(this.params, 'productComponentId');
  },
}
</script>
