<template>
  <div class="col_full quantity-component">
    <label class="text-break">
      {{ displayName || $trans('product.calculator.quantity') }} :
    </label>
    <div style="padding: 0px 5px;">
      <IonRangeSlider
        :options="values ? {
          values,
          from: values?.indexOf(value),
          grid: true,
        } : {
          min: from,
          max: to,
          step,
          grid: true,
        }"
        :value="value"
        @input="params.quantity = Number(values ? values[$event] : $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'params',
    'defaults',
    'displayName',
    'values',
    'from',
    'to',
    'step',
  ],
  computed: {
    value() {
      if (this.params.quantity !== undefined) {
        return this.params.quantity;
      }
      if (this.defaults?.quantity !== undefined) {
        return this.defaults.quantity;
      }
      return this.values ? 0 : this.from;
    },
  },
  mounted() {
    this.$set(this.params, 'quantity', Number(this.value));
  },
  destroyed() {
    this.$delete(this.params, 'quantity');
  },
}
</script>
