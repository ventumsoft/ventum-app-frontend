<template>
  <div v-show="false" class="col_full">
    <label>{{ $trans('product.quantity.product.selection.print.run') }}</label>
    <select ref="input" name="params[productComponentId]">
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
    'formData',
    'components',
  ],
  computed: {
    ...mapState('page', ['product']),
    value() {
      const quantity = Number(this.formData?.['params[quantity]']);
      if (quantity) {
        const component = this.components.find(component =>
          (component?.calculator.quantityRange?.from <= quantity) && (quantity <= component?.calculator.quantityRange?.to));
        return component?.id || '';
      }

      const componentId = this.formData?.['params[productComponentId]'];
      if (componentId !== undefined) {
        return componentId;
      }

      return this.product.calculator.defaults?.productComponentId;
    },
  },
  watch: {
    async value() {
      await this.$nextTick();
      this.$refs.input.dispatchEvent(new Event('change', {bubbles: true}));
    },
  },
}
</script>
