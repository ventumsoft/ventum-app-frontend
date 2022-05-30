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
      <form id="calculator">
        <ContentPageProductCalculatorArea
          v-if="product.calculator.areaSettings"
          v-bind="product.calculator.areaSettings"
          :params="params"
          :defaults="product.calculator.defaults"
        />
        <ContentPageProductCalculatorAreaFixed
          v-else-if="product.calculator.areaFixedSettings"
          :params="params"
          v-bind="product.calculator.areaFixedSettings"
        />
        <ContentPageProductCalculatorQuantityComponentSelect
          v-if="product.calculator.quantityComponents?.length"
          :components="product.calculator.quantityComponents"
          :params="params"
          :defaults="product.calculator.defaults"
        />
        <ContentPageProductCalculatorKitComponentSelect
          v-if="product.calculator.kitComponents?.length"
          :components="product.calculator.kitComponents"
          :params="params"
          :defaults="product.calculator.defaults"
        />
        <ContentPageProductCalculatorQuantity
          v-if="product.calculator.quantitySettings"
          v-bind="product.calculator.quantitySettings"
          :params="params"
          :defaults="product.calculator.defaults"
        />
        <ContentPageProductCalculatorArea
          v-if="kitComponent?.calculator?.areaSettings"
          v-bind="kitComponent.calculator.areaSettings"
          :key="'kit-component-' + kitComponent.id + '-area'"
          :params="params"
          :defaults="kitComponent.calculator.defaults"
        />
        <ContentPageProductCalculatorAreaFixed
          v-else-if="kitComponent?.calculator?.areaFixedSettings"
          :key="'kit-component-' + kitComponent.id + '-area-fixed'"
          :params="params"
          v-bind="kitComponent.calculator.areaFixedSettings"
        />
        <ContentPageProductCalculatorQuantity
          v-if="kitComponent?.calculator?.quantitySettings"
          v-bind="kitComponent.calculator.quantitySettings"
          :key="'kit-component-' + kitComponent.id + '-quantity'"
          :params="params"
          :defaults="kitComponent.calculator.defaults"
        />
        <ContentPageProductCalculatorOptions
          v-if="kitComponent?.calculator?.options?.length"
          :key="'kit-component-' + kitComponent.id + '-options'"
          :params="params"
          :defaults="kitComponent.calculator.defaults"
          :options="kitComponent.calculator.options"
        />
        <ContentPageProductCalculatorOptions
          v-if="product.calculator.options?.length"
          :params="params"
          :defaults="product.calculator.defaults"
          :options="product.calculator.options"
        />
        <ContentPageProductCalculatorOptions
          v-if="quantityComponent?.calculator?.options?.length"
          :key="'quantity-component-' + quantityComponent.id + '-options'"
          :params="params"
          :defaults="product.calculator.defaults"
          :options="quantityComponent.calculator.options"
        />
        <template v-if="product.calculator.compoundComponents?.length">
          <ContentPageProductCalculatorCompoundComponentParams
            v-for="component of product.calculator.compoundComponents"
            :key="component.id"
            :params="params"
            :defaults="product.calculator.defaults"
            v-bind="{component}"
          />
        </template>
      </form>
    </div>
    <div class="alert alert-danger" v-if="priceData.error"><i class="icon-warning-sign"></i> {{ priceData.error }}</div>
    <div
      class="product-price"
      id="product-price"
      style="font-size: xx-large; min-height: 48px;"
    >
      <Transition>
        <span class="total-price-product" v-if="priceData.formatted && (priceData.formatted !== priceData.formattedWithDiscount)">{{ priceData.formatted }}</span>
        <ins v-if="priceData.formattedWithDiscount"><span>{{ priceData.formattedWithDiscount || product.calculator.basicPrice }}</span></ins>
        <div class="discount-bonus-info" v-if="priceData.discountBonusInfo">{{ priceData.discountBonusInfo }}</div>
      </Transition>
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
import _debounce from 'lodash/debounce';
import {mapState} from 'vuex';

import ProductKindEnum from '@/enums/ProductKindEnum';

export default {
  data: () => ({
    ProductKindEnum,
    preventing: true,
    params: {},
    priceData: {
      error: null,
      value: null,
      formatted: null,
      valueWithDiscount: null,
      formattedWithDiscount: null,
      discountBonusInfo: null,
    },
  }),
  computed: {
    ...mapState('page', ['product']),
    quantityComponent() {
      const componentId = Number(this.params.productComponentId);
      return this.product.calculator.quantityComponents?.find(component => component.id === componentId);
    },
    kitComponent() {
      const componentId = Number(this.params.productComponentId);
      return this.product.calculator.kitComponents?.find(component => component.id === componentId);
    },
  },
  beforeMount() {
    this.params = {};
  },
  async mounted() {
    this.preventing = false;
    this.updatePrice();
  },
  watch: {
    params: {
      handler() {
        this.updatePrice();
      },
      deep: true,
    },
  },
  methods: {
    updatePrice: _debounce(async function () {
      for (const key in this.priceData) {
        this.priceData[key] = null;
      }
      ({data: this.priceData} = await this.$axios.post('products/price', {
        productId: this.product.id,
        params: this.params,
      }, {progress: false}));
    }, 10),
  },
}
</script>
