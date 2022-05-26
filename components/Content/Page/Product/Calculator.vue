<template>
  <div class="col_one_third portfolio-single-content col_last nobottommargin product-price-calculation-block">
    <div v-if="product.calculator.description" class="product-description-block">
      <div class="fancy-title title-bottom-border" >
        <h2>{{ $trans('product.product_description.label') }}</h2>
      </div>
      <p v-html="product.calculator.description"></p>
    </div>
    <div class="product-calculator-block" :style="{visibility: preventing && 'hidden' || ''}">
      <div v-if="product.calculator.withTitle" class="fancy-title title-bottom-border" :style="{'margin-bottom': $store.state.site.settings?.['e-commerce:products:show-product-id'] ? '20px' : ''}">
        <h2>{{ $trans('product.calculator.name') }}</h2>
        <div v-if="$store.state.site.settings?.['e-commerce:products:show-product-id']" class="product-id-block">
          <label>{{ $trans('product.calculator.product-id-label') }}:</label>
          <span class="product-id-block-value">{{ product.id }}</span>
        </div>
      </div>
      <form ref="form" id="calculator" class="product-calculator-form" @input="handleFormChange" @change="handleFormChange">
        <input type="hidden" name="productId" :value="product.id">
        <input type="hidden" name="price">
        <ContentPageProductCalculatorArea v-if="product.calculator.areaSettings" v-bind="product.calculator.areaSettings" />
        <ContentPageProductCalculatorAreaFixed v-else-if="product.calculator.areaFixedSettings" v-bind="product.calculator.areaFixedSettings" />
        <div v-if="product.kind === ProductKindEnum.QUANTITY" v-show="false" class="col_full">
          <label>{{ $trans('product.quantity.product.selection.print.run') }}</label>
          <div>quantity product components</div>
        </div>
        <div v-if="(product.kind === ProductKindEnum.KIT) && (void 'components.length')">
          <div class="col_full">
            <label class="text-break">{{ (void 'kits_display_name') || $trans('product.kit.product.select.part') }}</label>
            <div>kit product components</div>
          </div>
        </div>
        <ContentPageProductCalculatorQuantity v-if="product.calculator.quantitySettings" inputName="params[quantity]" v-bind="product.calculator.quantitySettings" />
        <template v-if="product.kind === ProductKindEnum.KIT">
          <div>kit component area container</div>
          <div>kit component quantity container</div>
          <div>kit component options container</div>
        </template>
        <ContentPageProductCalculatorOptions v-if="product.calculator.options" :options="product.calculator.options" />
        <div v-if="product.kind === ProductKindEnum.QUANTITY">quantity component options</div>
        <template v-if="product.kind === ProductKindEnum.COMPOUND">
          <div
            v-for="component of []"
            v-show="(void 'component.optionsNotHidden.length') || (void 'component.is_choose_quantity')"
            class="col_full component-container"
            :class="'compound-product-' + component.id"
          >
            <div class="col_full">
              <div class="component-name bottom-border"><label class="text-break"><i>component.name</i></label></div>
              <template v-if="void 'component.is_choose_quantity'">
                <div class="component-quantity-name"><label class="text-break">component.quantity_name:</label></div>
                <div style="padding:0 5px 0 20px;">compound component quantity</div>
              </template>
              <div v-else>compound component quantity = 1</div>
            </div>
            <div>compound component options</div>
          </div>
        </template>
      </form>
    </div>
    <div class="alert alert-danger product-price-calculator-error-message" style="display: none;"></div>
    <div
      class="product-price"
      id="product-price"
      style="font-size: xx-large; min-height: 48px;"
    >
      <span class="total-price-product" style="display: none;"></span>
      <ins><span class="total-price-product-with-discount" style="/*display: none;*/">{{ product.calculator.basicPrice }}</span></ins>
      <div class="discount-bonus-info"></div>
      <button
        type="button"
        class="button button-reveal button-rounded tright fright nomargin product-calculator-order-button hidden-xs hidden-sm hidden-md hidden-lg"
      >
        <span>{{ $trans('product.button.order') }}</span>
        <i class="icon-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

import ProductKindEnum from '@/enums/ProductKindEnum';

export default {
  data: () => ({
    ProductKindEnum,
    preventing: true,
  }),
  computed: {
    ...mapState('page', ['product']),
  },
  async mounted() {
    await this.$nextTick();
    this.preventing = false;
  },
  methods: {
    handleFormChange(event) {
      console.log('handleFormChange', event);
      console.log(this.$refs.form);
    },
  },
}
</script>
