<template>
  <div
    v-if="
      (!Number(dependOptionId) || Number(formData?.['params[options][' + dependOptionId + ']']) && dependElementsIds?.find(dependElementId => (dependElementId === 'all') || (dependElementId == formData['params[options][' + dependOptionId + ']']))) &&
      (!Number(excludedOptionId) || !Number(formData?.['params[options][' + excludedOptionId + ']']) || !excludedElementsIds?.find(excludedElementId => (excludedElementId === 'all') || (excludedElementId == formData['params[options][' + excludedOptionId + ']'])))
    "
    class="col_full"
    :class="{hidden, 'has-error': required && !value}"
  >
    <label class="text-break">
      <fragment v-html="name" />
      <span v-if="description" class="color"><i class="icon-question-sign option-description" v-bs.tooltip="{title: $nl2br(description)}"></i></span>
      :
    </label>
    <Select2
      v-if="inputType === 'select'"
      class="form-control select2 product-calculator-product-option"
      :class="{'product-calculator-select-with-modal': false}"
      :name="inputName"
      :options="{
        templateSelection,
        templateResult,
      }"
    >
      <option
        v-if="!required"
        value="0"
        :selected="!value"
      >{{ $trans('product.calculator.select.none') }}</option>
      <option
        v-for="element of elements"
        :value="element.id"
        :data-name="element.name"
        :data-element-color="(viewType === ProductOptionViewTypeEnum.COLOR) && element.color"
        :selected="value == element.id"
      ></option>
    </Select2>
    <div v-else-if="inputType === 'range'" style="padding: 0 5px;">
      <IonRangeSlider
        :name="inputName"
        :options="{
          min: range?.from,
          max: range?.to,
          step: range?.step,
          grid: true,
        }"
        :value="value"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

import ProductOptionViewTypeEnum from '@/enums/ProductOptionViewTypeEnum';

export default {
  props: [
    'formData',
    'defaults',
    'id',
    'name',
    'description',
    'viewType',
    'inputType',
    'hidden',
    'dependOptionId',
    'dependElementsIds',
    'excludedOptionId',
    'excludedElementsIds',
    'required',
    'elements',
    'range',
  ],
  data: () => ({
    ProductOptionViewTypeEnum,
  }),
  computed: {
    ...mapState('page', ['product']),
    inputName() {
      return 'params[options][' + this.id + ']';
    },
    value() {
      return (this.formData?.[this.inputName] !== undefined) ? this.formData[this.inputName] : this.defaults?.options?.[this.id];
    },
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
