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
      <form ref="form" id="calculator" class="product-calculator-form" @change="updateFormData">
        <input type="hidden" name="productId" :value="product.id">
        <input type="hidden" name="price">
        <ContentPageProductCalculatorArea
          v-if="product.calculator.areaSettings"
          v-bind="product.calculator.areaSettings"
          :widthValue="product.calculator.defaults?.width"
          :heightValue="product.calculator.defaults?.height"
        />
        <ContentPageProductCalculatorAreaFixed
          v-else-if="product.calculator.areaFixedSettings"
          v-bind="product.calculator.areaFixedSettings"
        />
        <div v-if="product.quantityComponents?.length" v-show="false" class="col_full">
          <label>{{ $trans('product.quantity.product.selection.print.run') }}</label>
          <select name="params[productComponentId]">
            <option
              v-if="product.quantityComponents[0].quantityRange?.from != product.calculator.quantitySettings?.from"
              value=""
            >{{ $trans('product.calculator.select.none') }}</option>
            <option
              v-for="component of product.quantityComponents"
              :value="component.id"
              :selected="product.calculator.defaults?.productComponentId == component.id"
            >{{ component.name }}</option>
          </select>
        </div>
        <div v-if="(product.kind === ProductKindEnum.KIT) && (void 'components.length')">
          <div class="col_full">
            <label class="text-break">{{ (void 'kits_display_name') || $trans('product.kit.product.select.part') }}</label>
            <div>kit product components</div>
          </div>
        </div>
        <ContentPageProductCalculatorQuantity
          v-if="product.calculator.quantitySettings"
          inputName="params[quantity]"
          v-bind="product.calculator.quantitySettings"
          :value="product.calculator.defaults?.quantity"
        />
        <template v-if="product.kind === ProductKindEnum.KIT">
          <div>kit component area container</div>
          <div>kit component quantity container</div>
          <div>kit component options container</div>
        </template>
        <ContentPageProductCalculatorOptions
          v-if="product.calculator.options?.length"
          :options="product.calculator.options"
        />
        <div v-if="product.kind === ProductKindEnum.QUANTITY">quantity component options</div>
        <template v-if="product.compoundComponents?.length">
          <ContentPageProductCalculatorCompoundComponent
            v-for="component of product.compoundComponents"
            :key="component.id"
            v-bind="{component}"
          />
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
    formData: null,
  }),
  computed: {
    ...mapState('page', ['product']),
  },
  async mounted() {
    this.updateFormData();
    await new Promise(resolve => setTimeout(() => resolve(), 0));
    this.preventing = false;
  },
  methods: {
    updateFormData() {
      this.formData = new FormData(this.$refs.form);
    },
  },
}
</script>
