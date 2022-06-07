<template>
  <div
    v-show="component.calculator?.quantitySettings || component.calculator?.options?.find(option => !option.hidden)"
    class="col_full component-container"
    :class="'compound-product-' + component.id"
  >
    <div class="col_full">
      <div class="component-name bottom-border"><label class="text-break"><i>{{ component.name }}</i></label></div>
      <template v-if="component.calculator?.quantitySettings">
        <div class="component-quantity-name"><label class="text-break">{{ component.calculator.quantitySettings.displayName }}:</label></div>
        <div style="padding:0 5px 0 20px;">
          <IonRangeSlider
            :options="component.calculator.quantitySettings.values ? {
              values: component.calculator.quantitySettings.values,
              from: component.calculator.quantitySettings.values?.indexOf(quantityValue),
              grid: true,
            } : {
              min: component.calculator.quantitySettings.from,
              max: component.calculator.quantitySettings.to,
              step: component.calculator.quantitySettings.step,
              grid: true,
            }"
            :value="quantityValue"
            @input="$store.commit('product/setParamsValue', {key: 'componentQuantity.' + component.id, value: Number($event)})"
          />
        </div>
      </template>
    </div>
    <ContentPageProductCalculatorOptions
      v-if="component.calculator?.options?.length"
      :defaults="defaults"
      :options="component.calculator.options.filter(option => !option.isOnlyForApps)"
      :component="true"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'component',
    'defaults',
  ],
  computed: {
    ...mapState('product', ['params']),
    quantityValue() {
      if (!this.component.calculator?.quantitySettings) {
        return 1;
      }
      if (this.params.componentQuantity?.[this.component.id] !== undefined) {
        return this.params.componentQuantity[this.component.id];
      }
      if (this.defaults?.componentQuantity?.[this.component.id] !== undefined) {
        return this.defaults.componentQuantity[this.component.id];
      }
      return this.component.calculator.quantitySettings.values ? this.component.calculator.quantitySettings.values[0] : this.component.calculator.quantitySettings.from;
    },
  },
  mounted() {
    this.$store.commit('product/setParamsValue', {key: 'componentQuantity.' + this.component.id, value: Number(this.quantityValue)});
  },
  destroyed() {
    this.$store.commit('product/setParamsValue', {key: 'componentQuantity.' + this.component.id, value: undefined});
  },
}
</script>
