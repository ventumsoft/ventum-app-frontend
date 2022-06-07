<template>
  <div class="col_full quantity-component">
    <label class="text-break">
      {{ quantitySettings.displayName || $trans('product.calculator.quantity') }} :
    </label>
    <div style="padding: 0px 5px;">
      <IonRangeSlider
        :options="values ? {
          values,
          from: values?.indexOf(value),
          grid: true,
        } : {
          min: range.from,
          max: range.to,
          step: quantitySettings.step,
          grid: true,
        }"
        :value="value"
        @input="$store.commit('product/setParamsValue', {key: 'quantity', value: Number($event)})"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: [
    'quantitySettings',
    'defaults',
  ],
  computed: {
    ...mapState('product', ['params']),
    range() {
      const {from, to} = this.quantitySettings;
      if (!this.quantitySettings.values && this.quantitySettings.area) {
        const [from, to] = calcQuantityRangeByArea(
          this.params.width,
          this.params.height,
          this.quantitySettings.area,
          this.quantitySettings.from,
          this.quantitySettings.to
        );
        return {from, to};
      }
      return {from, to};
    },
    values() {
      if (this.quantitySettings.values && this.quantitySettings.area) {
        return filterQuantityValuesByArea(
          this.quantitySettings.values,
          this.params.width,
          this.params.height,
          this.quantitySettings.area
        );
      }
      return this.quantitySettings.values;
    },
    value() {
      if (this.params.quantity !== undefined) {
        return this.params.quantity;
      }
      if (this.defaults?.quantity !== undefined) {
        return this.defaults.quantity;
      }
      return this.quantitySettings.values ? this.quantitySettings.values[0] : this.range.from;
    },
  },
  mounted() {
    this.$store.commit('product/setParamsValue', {key: 'quantity', value: Number(this.value)});
  },
  destroyed() {
    this.$store.commit('product/setParamsValue', {key: 'quantity', value: undefined});
  },
}

function calcQuantityRangeByArea(width, height, areaQuantitySettings, limitFrom, limitTo) {
  const min = Number(areaQuantitySettings.min) || 0;
  const max = Number(areaQuantitySettings.max) || 0;
  const bleeds = Number(areaQuantitySettings.bleeds) || 0;
  const area = (bleeds + width + bleeds) * (bleeds + height + bleeds);
  const from = Math.max(1, Math.ceil(min / area), limitFrom);
  const to = Math.max(1, Math.min(Math.floor(max / area), limitTo));
  return [from, to];
}

function filterQuantityValuesByArea(values, width, height, areaQuantitySettings) {
  const min = Number(areaQuantitySettings.min) || 0;
  const max = Number(areaQuantitySettings.max) || 0;
  const bleeds = Number(areaQuantitySettings.bleeds) || 0;
  const area = (bleeds + width + bleeds) * (bleeds + height + bleeds);
  const from = Math.max(1, Math.ceil(min / area));
  const to = Math.max(1, Math.floor(max / area));
  return values.filter(value => (from <= value) && (value <= to));
}
</script>
