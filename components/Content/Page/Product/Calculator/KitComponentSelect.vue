<template>
  <div class="col_full">
    <label class="text-break">{{ product.calculator.kitDisplayName || $trans('product.kit.product.select.part') }}</label>
    <Select2 @input="$store.commit('product/setParamsValue', {key: 'productComponentId', value: Number($event)})">
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
    'defaults',
    'components',
  ],
  computed: {
    ...mapState('page', ['product']),
    ...mapState('product', ['params']),
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
    this.$store.commit('product/setParamsValue', {key: 'productComponentId', value: Number(this.value)});
  },
  destroyed() {
    this.$store.commit('product/setParamsValue', {key: 'productComponentId', value: undefined});
  },
}
</script>
