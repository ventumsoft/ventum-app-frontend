<template>
  <div class="col_full quantity-component">
    <label class="text-break">
      {{ displayName || $trans('product.calculator.quantity') }} :
    </label>
    <div style="padding: 0px 5px;">
      <IonRangeSlider
        name="params[quantity]"
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
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'displayName',
    'values',
    'from',
    'to',
    'step',
    'value',
  ],
}
</script>
