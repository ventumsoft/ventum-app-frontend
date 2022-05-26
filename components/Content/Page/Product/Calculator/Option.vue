<template>
  <div class="col_full" :class="{hidden}">
    <label class="text-break">
      <fragment v-html="name" />
      <span v-if="description" class="color"><i class="icon-question-sign option-description" v-bs.tooltip="{title: $nl2br(description)}"></i></span>
      :
    </label>
    <Select2
      v-if="inputType === 'select'"
      class="form-control select2 product-calculator-product-option"
      :class="{'product-calculator-select-with-modal': false}"
      :name="'params[options][' + id + ']'"
      :options="{
        templateSelection,
        templateResult,
      }"
    >
      <option
        v-if="!required"
        value="0"
        :selected="(product.calculator.defaults?.options?.[id] !== undefined) && !product.calculator.defaults.options[id]"
      >{{ $trans('product.calculator.select.none') }}</option>
      <option
        v-for="element of elements"
        :value="element.id"
        :data-name="element.name"
        :data-element-color="(viewType === ProductOptionViewTypeEnum.COLOR) && element.color"
        :selected="product.calculator.defaults?.options?.[id] == element.id"
      ></option>
    </Select2>
    <div v-else-if="inputType === 'range'" style="padding: 0 5px;">
      <IonRangeSlider
        :name="'params[options][' + id + ']'"
        :options="{
          min: range?.from,
          max: range?.to,
          step: range?.step,
          grid: true,
        }"
        :value="null"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

import ProductOptionViewTypeEnum from '@/enums/ProductOptionViewTypeEnum';

export default {
  props: [
    'id',
    'name',
    'description',
    'viewType',
    'inputType',
    'hidden',
    'required',
    'elements',
    'range',
  ],
  data: () => ({
    ProductOptionViewTypeEnum,
  }),
  computed: {
    ...mapState('page', ['product']),
  },
  methods: {
    templateSelection(selection) {
      return $(
        '<span>' +
        ((selection.element && selection.element.dataset.elementColor) ? ('<span class="product-option-element-color" style="background: ' + selection.element.dataset.elementColor + '; ">&nbsp;</span> ') : '') +
        (selection.element?.dataset?.name || selection.text) +
        '</span>'
      );
    },
    templateResult(result) {
      const text = result.element?.dataset?.name || result.text;
      const elementColor = $(result.element).is('[data-element-color]') ? '<span class="product-option-element-color" style="background-color: ' + $(result.element).data('element-color') + ';"></span>' : '';
      return result.id ? $(elementColor + '<span>' + text + '</span><b class="calculator-option-element-price pull-right" data-option-element-value="' + result.id + '"><i class="icon-cog spinner"></i></b>') : text;
    },
  },
}
</script>
