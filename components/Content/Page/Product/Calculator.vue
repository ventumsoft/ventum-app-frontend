<template>
  <div v-if="product.calculator" class="col_one_third portfolio-single-content col_last nobottommargin product-price-calculation-block">
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
          <span class="product-id-block-value">{{ product.id + (kitComponent ? ('-' + kitComponent.id) : '') }}</span>
        </div>
      </div>
      <form ref="form" id="calculator" class="product-calculator-form" @change="updateFormData">
        <input type="hidden" name="productId" :value="product.id">
        <input type="hidden" name="price">
        <ContentPageProductCalculatorArea
          v-if="product.calculator.areaSettings"
          v-bind="product.calculator.areaSettings"
          :widthValue="(formData?.['params[width]'] !== undefined) ? formData['params[width]'] : product.calculator.defaults?.width"
          :heightValue="(formData?.['params[height]'] !== undefined) ? formData['params[height]'] : product.calculator.defaults?.height"
        />
        <ContentPageProductCalculatorAreaFixed
          v-else-if="product.calculator.areaFixedSettings"
          v-bind="product.calculator.areaFixedSettings"
        />
        <ContentPageProductCalculatorQuantityComponentSelect
          v-if="product.calculator.quantityComponents?.length"
          :components="product.calculator.quantityComponents"
          :formData="formData"
        />
        <ContentPageProductCalculatorKitComponentSelect
          v-if="product.calculator.kitComponents?.length"
          :components="product.calculator.kitComponents"
          :formData="formData"
        />
        <ContentPageProductCalculatorQuantity
          v-if="product.calculator.quantitySettings"
          v-bind="product.calculator.quantitySettings"
          :value="(formData?.['params[quantity]'] !== undefined) ? formData['params[quantity]'] : product.calculator.defaults?.quantity"
        />
        <ContentPageProductCalculatorArea
          v-if="kitComponent?.calculator?.areaSettings"
          v-bind="kitComponent.calculator.areaSettings"
          :widthValue="(formData?.['params[width]'] !== undefined) ? formData['params[width]'] : kitComponent.calculator.defaults?.width"
          :heightValue="(formData?.['params[height]'] !== undefined) ? formData['params[height]'] : kitComponent.calculator.defaults?.height"
        />
        <ContentPageProductCalculatorAreaFixed
          v-else-if="kitComponent?.calculator?.areaFixedSettings"
          v-bind="kitComponent.calculator.areaFixedSettings"
        />
        <ContentPageProductCalculatorQuantity
          v-if="kitComponent?.calculator?.quantitySettings"
          v-bind="kitComponent.calculator.quantitySettings"
          :value="(formData?.['params[quantity]'] !== undefined) ? formData['params[quantity]'] : kitComponent.calculator.defaults?.quantity"
        />
        <ContentPageProductCalculatorOptions
          v-if="kitComponent?.calculator?.options?.length"
          :formData="formData"
          :defaults="kitComponent.calculator.defaults"
          :options="kitComponent.calculator.options"
        />
        <ContentPageProductCalculatorOptions
          v-if="product.calculator.options?.length"
          :formData="formData"
          :defaults="product.calculator.defaults"
          :options="product.calculator.options"
        />
        <ContentPageProductCalculatorOptions
          v-if="quantityComponent?.calculator?.options?.length"
          :formData="formData"
          :defaults="product.calculator.defaults"
          :options="quantityComponent.calculator.options"
        />
        <template v-if="product.calculator.compoundComponents?.length">
          <ContentPageProductCalculatorCompoundComponentParams
            v-for="component of product.calculator.compoundComponents"
            :key="component.id"
            :formData="formData"
            :defaults="product.calculator.defaults"
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
    quantityComponent() {
      const componentId = Number(this.formData?.['params[productComponentId]']);
      return this.product.calculator.quantityComponents?.find(component => component.id === componentId);
    },
    kitComponent() {
      const componentId = Number(this.formData?.['params[productComponentId]']);
      return this.product.calculator.kitComponents?.find(component => component.id === componentId);
    },
  },
  async mounted() {
    this.updateFormData();
    await new Promise(resolve => setTimeout(() => resolve(), 0));
    this.preventing = false;
    await new Promise(resolve => setTimeout(() => resolve(), 100));
    this.updateFormData();
  },
  methods: {
    updateFormData() {
      this.formData = Object.fromEntries(new FormData(this.$refs.form));
      console.log('updateFormData', this.$refs.form, JSON.stringify(this.formData));
    },
  },
}
</script>
