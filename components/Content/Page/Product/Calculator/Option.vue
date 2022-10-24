<template>
  <div class="col_full" :class="{hidden: option.hidden, 'has-error': option.required && !value}">
    <label class="text-break">
      <fragment v-html="option.name" />
      <span v-if="option.description" class="color"><i class="icon-question-sign option-description" v-bs.tooltip="{title: $nl2br(option.description)}"></i></span>
      :
    </label>
    <Select2
      ref="optionSelect2"
      v-if="option.inputType === 'select'"
      class="form-control select2 product-calculator-product-option"
      :class="{'product-calculator-select-with-modal': false}"
      :options="{
        templateSelection,
        templateResult,
      }"
      @input="$store.commit('product/setParamsValue', {key: 'options.' + option.id, value: Number($event)})"
    >
      <option
        v-if="!option.required"
        value="0"
        :selected="!value"
      >{{ $trans('product.calculator.select.none') }}</option>
      <option
        v-for="element of option.elements"
        :value="element.id"
        :data-name="element.name"
        :data-element-color="(option.viewType === ProductOptionViewTypeEnum.COLOR) && element.color"
        :selected="value == element.id"
      ></option>
    </Select2>
    <div v-else-if="option.inputType === 'range'" style="padding: 0 5px;">
      <IonRangeSlider
        :options="{
          min: option.range?.from,
          max: option.range?.to,
          step: option.range?.step,
          grid: true,
        }"
        :value="value"
        @input="$store.commit('product/setParamsValue', {key: 'options.' + option.id, value: Number($event)})"
      />
    </div>
    <div
      ref="modal"
      v-if="(option.inputType === 'select') && (option.viewType === ProductOptionViewTypeEnum.PICTURESVIEW)"
      class="modal fade content-modal"
      style="top: 0px;"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title center" v-html="option.name"></h4>
          </div>
          <div class="modal-body">
            <div class="clearfix product-option-elements">
              <article
                v-if="!option.required"
                class="portfolio-item pf-media pf-icons"
                data-dismiss="modal"
                @click.prevent="$store.commit('product/setParamsValue', {key: 'options.' + option.id, value: 0})"
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
                v-for="element of option.elements"
                class="portfolio-item pf-media pf-icons"
                data-dismiss="modal"
                @click.prevent="$store.commit('product/setParamsValue', {key: 'options.' + option.id, value: Number(element.id)})"
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
    'option',
    'defaults',
  ],
  data: () => ({
    ProductOptionViewTypeEnum,
  }),
  computed: {
    ...mapState('page', ['product']),
    ...mapState('product', ['params']),
    value() {
      if (this.params.options?.[this.option.id] !== undefined) {
        return this.params.options[this.option.id];
      }
      if ((this.defaults?.options?.[this.option.id] !== undefined) && (this.defaults.options[this.option.id] !== 'any')) {
        return this.defaults.options[this.option.id];
      }
      if ((this.option.inputType === 'select') && this.option.required && this.option.elements?.length) {
        return this.option.elements[0].id;
      }
      if ((this.option.inputType === 'range') && (this.option.range?.from !== undefined)) {
        return this.option.range.from;
      }
      return 0;
    },
  },
  mounted() {
    this.$store.commit('product/setParamsValue', {
      key: 'options.' + this.option.id,
      value: Number(this.value) || 0,
    });
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
      if (this.option.viewType === ProductOptionViewTypeEnum.PICTURESVIEW) {
        event.preventDefault();
        $(this.$refs.modal).modal('show');
      }
      let elementsPrices;
      try {
        ({data: elementsPrices} = await this.$axios.get('products/option-elements-prices', {params: {
          productId: this.product.id,
          params: this.params,
          usingPrice: this.$store.state.product.currentActiveEmbeddedIntegration?.usingPrice || undefined,
          optionId: this.option.id,
          optionValues: [!this.option.required ? 0 : undefined, ...this.option.elements.map(element => element.id)].filter(v => v !== undefined),
          optionsIds: Object.keys(this.params.options),
        }}, {progress: false}));
      } catch (exception) {
        return;
      }
      const $optionElementsPrices = (this.option.viewType === ProductOptionViewTypeEnum.PICTURESVIEW) ?
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
    this.$store.commit('product/setParamsValue', {
      key: 'options.' + this.option.id,
      value: undefined,
    });
  },
}
</script>
