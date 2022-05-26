<template>
  <div
    v-show="component.quantitySettings || component.options?.find(option => !option.hidden)"
    class="col_full component-container"
    :class="'compound-product-' + component.id"
  >
    <div class="col_full">
      <div class="component-name bottom-border"><label class="text-break"><i>{{ component.name }}</i></label></div>
      <template v-if="component.quantitySettings">
        <div class="component-quantity-name"><label class="text-break">{{ component.quantitySettings.displayName }}:</label></div>
        <div style="padding:0 5px 0 20px;">
          <IonRangeSlider
            :name="'params[componentQuantity][' + component.id + ']'"
            :options="component.quantitySettings.values ? {
              values: component.quantitySettings.values,
              from: component.quantitySettings.values?.indexOf(product.calculator.defaults?.componentQuantity?.[component.id]),
              grid: true,
            } : {
              min: component.quantitySettings.from,
              max: component.quantitySettings.to,
              step: component.quantitySettings.step,
              grid: true,
            }"
            :value="product.calculator.defaults?.componentQuantity?.[component.id]"
          />
        </div>
      </template>
      <input
        v-else
        type="hidden"
        :name="'params[componentQuantity][' + component.id + ']'"
        value="1"
      >
    </div>
    <ContentPageProductCalculatorOptions
      v-if="component.options?.length"
      :options="component.options"
      :component="true"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'component',
  ],
  computed: {
    ...mapState('page', ['product']),
  },
}
</script>
