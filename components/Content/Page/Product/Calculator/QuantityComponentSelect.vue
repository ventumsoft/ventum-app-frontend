<template>
  <div v-show="false" class="col_full">
    <label>{{ $trans('product.quantity.product.selection.print.run') }}</label>
    <select ref="input">
      <option
        v-if="components[0].quantityRange?.from != product.calculator.quantitySettings?.from"
        value=""
        :selected="!value"
      >{{ $trans('product.calculator.select.none') }}</option>
      <option
        v-for="component of components"
        :value="component.id"
        :selected="value == component.id"
      >{{ component.name }}</option>
    </select>
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
      const quantity = Number(this.params.quantity);
      if (quantity) {
        const component = this.components.find(component =>
          (component?.calculator.quantityRange?.from <= quantity) && (quantity <= component?.calculator.quantityRange?.to));
        return component?.id || '';
      }

      const componentId = this.params.productComponentId;
      if (componentId !== undefined) {
        return componentId;
      }

      return this.defaults?.productComponentId;
    },
  },
  mounted() {
    this.$store.commit('product/setParamsValue', {key: 'productComponentId', value: Number(this.value)});
  },
  watch: {
    async value() {
      await this.$nextTick();
      this.$refs.input.dispatchEvent(new Event('change', {bubbles: true}));
      this.$store.commit('product/setParamsValue', {key: 'productComponentId', value: Number(this.value)});
    },
  },
  destroyed() {
    this.$store.commit('product/setParamsValue', {key: 'productComponentId', value: undefined});
  },
}
</script>
