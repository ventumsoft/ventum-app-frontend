<template>
  <div class="col_full" :class="{'component-option': false, hidden: false}">
    <label class="text-break">
      <fragment v-html="name" />
      <span v-if="description" class="color"><i class="icon-question-sign option-description" v-bs.tooltip="{title: $nl2br(description)}"></i></span>
      :
    </label>
    <Select2
      v-if="inputType === 'select'"
      :name="'params[options][' + id + ']'"
    >
      <option
        v-if="false"
        value="0"
        :selected="false"
      >{{ $trans('product.calculator.select.none') }}</option>
      <option
        v-for="element of elements"
        :value="element.id"
        v-html="element.name"
      ></option>
    </Select2>
    <select
      v-if="false && (inputType === 'select')"
      class="form-control select2 product-calculator-product-option"
      :class="{'product-calculator-select-with-modal': false}"
      :name="'params[options][' + id + ']'"
    >
      <option
        v-if="false"
        value="0"
        :selected="false"
      >{{ $trans('product.calculator.select.none') }}</option>
      <option
        v-for="element of elements"
        :value="element.id"
        v-html="element.name"
      ></option>
    </select>
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
export default {
  props: [
    'id',
    'name',
    'description',
    'viewType',
    'inputType',
    'elements',
    'range',
  ],
}
</script>
