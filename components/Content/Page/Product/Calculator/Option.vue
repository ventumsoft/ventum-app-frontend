<template>
  <div class="col_full" :class="{hidden, 'has-error': required && !value}">
    <label class="text-break">
      <fragment v-html="name" />
      <span v-if="description" class="color"><i class="icon-question-sign option-description" v-bs.tooltip="{title: $nl2br(description)}"></i></span>
      :
    </label>
    <Select2
      ref="optionSelect2"
      v-if="inputType === 'select'"
      class="form-control select2 product-calculator-product-option"
      :class="{'product-calculator-select-with-modal': false}"
      :options="{
        templateSelection,
        templateResult,
      }"
      @input="params.options[id] = Number($event)"
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
        :options="{
          min: range?.from,
          max: range?.to,
          step: range?.step,
          grid: true,
        }"
        :value="value"
        @input="params.options[id] = Number($event)"
      />
    </div>
    <div
      ref="modal"
      v-if="(inputType === 'select') && (viewType === ProductOptionViewTypeEnum.PICTURESVIEW)"
      class="modal fade content-modal"
      style="top: 0px;"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title center" v-html="name"></h4>
          </div>
          <div class="modal-body">
            <div class="clearfix product-option-elements">
              <article
                v-if="!required"
                class="portfolio-item pf-media pf-icons"
                data-dismiss="modal"
                @click.prevent="params.options[id] = 0"
              >
                <div class="portfolio-image">
                  <a href="#"><img src="/images/placeholder.jpg"></a>
                </div>
                <div class="portfolio-desc">
                  <h3 class="text-break" v-html="$trans('product.calculator.select.none')"></h3>
                  <span class="text-break"></span>
                </div>
                <div class="product-price calculator-option-element-price" data-option-element-value="0">
                  <i class="icon-cog spinner"></i>
                </div>
              </article>
              <article
                v-for="element of elements"
                class="portfolio-item pf-media pf-icons"
                data-dismiss="modal"
                @click.prevent="params.options[id] = Number(element.id)"
              >
                <div class="portfolio-image">
                  <a href="#">
                    <img :src="element.image || '/images/placeholder.jpg'">
                  </a>
                </div>
                <div class="portfolio-desc">
                  <h3 class="text-break" v-html="element.name"></h3>
                  <span class="text-break" v-html="$nl2br(element.description)"></span>
                </div>
                <div class="product-price calculator-option-element-price" :data-option-element-value="element.id">
                  <i class="icon-cog spinner"></i>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

import ProductOptionViewTypeEnum from '@/enums/ProductOptionViewTypeEnum';

export default {
  props: [
    'params',
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
    value() {
      if (this.params.options?.[this.id] !== undefined) {
        return this.params.options[this.id];
      }
      if (this.defaults?.options?.[this.id] !== undefined) {
        return this.defaults.options[this.id];
      }
      if ((this.inputType === 'select') && this.required && this.elements?.length) {
        return this.elements[0].id;
      }
      if ((this.inputType === 'range') && (this.range?.from !== undefined)) {
        return this.range.from;
      }
      return 0;
    },
  },
  mounted() {
    if (!this.params.options) {
      this.$set(this.params, 'options', {});
    }
    this.$set(this.params.options, this.id, Number(this.value) || 0);
    if (this.$refs.optionSelect2) {
      $(this.$refs.optionSelect2.$el).on('select2:opening', this.handleSelect2Opening);
    }
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
    async handleSelect2Opening(event) {
      if (this.viewType === ProductOptionViewTypeEnum.PICTURESVIEW) {
        event.preventDefault();
        $(this.$refs.modal).modal('show');
      }
      const {data: elementsPrices} = await this.$axios.post('products/option-elements-prices', {
        productId: this.product.id,
        params: this.params,
        // embedded options
        // using price
        optionId: this.id,
        optionValues: [!this.required ? 0 : undefined, ...this.elements.map(element => element.id)].filter(v => v !== undefined),
        optionsIds: Object.keys(this.params.options),
      }, {progress: false});
      const $optionElementsPrices = (this.viewType === ProductOptionViewTypeEnum.PICTURESVIEW) ?
        $(this.$refs.modal).find('.calculator-option-element-price') :
        $(this.$refs.optionSelect2.$el).data('select2').$dropdown.find('.calculator-option-element-price');
      for (const optionElementPrice of $optionElementsPrices) {
        if (elementsPrices?.[optionElementPrice.dataset.optionElementValue] !== undefined) {
          $(optionElementPrice).text(elementsPrices[optionElementPrice.dataset.optionElementValue]).show();
        } else {
          $(optionElementPrice).empty().hide();
        }
      }
    },
  },
  destroyed() {
    this.$delete(this.params.options, this.id);
  },
}
</script>
