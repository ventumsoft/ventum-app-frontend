<template>
  <div class="col_one_third portfolio-single-content col_last nobottommargin product-price-calculation-block">
    <div v-if="product.description" class="product-description-block">
      <div class="fancy-title title-bottom-border" >
        <h2>site/product.product_description.label</h2>
      </div>
      <p v-html="product.description"></p>
    </div>
    <div class="product-calculator-block" style="/*visibility: hidden;*/">
      <div v-if="product.calculatorWithTitle" class="fancy-title title-bottom-border" :style="{'margin-bottom': $store.state.site.settings?.['e-commerce:products:show-product-id'] ? '20px' : ''}">
        <h2>site/product.calculator.name</h2>
        <div v-if="$store.state.site.settings?.['e-commerce:products:show-product-id']" class="product-id-block">
          <label>site/product.calculator.product-id-label:</label>
          <span class="product-id-block-value">{{ product.id }}</span>
        </div>
      </div>
      <form id="calculator" class="product-calculator-form">
        <input type="hidden" name="productId" :value="product.id">
        <input type="hidden" name="price">
      </form>
    </div>
    <div class="alert alert-danger product-price-calculator-error-message" style="display: none;"></div>
    <div
      class="product-price"
      id="product-price"
      style="font-size: xx-large; min-height: 48px;"
    >
      <span class="total-price-product" style="display: none;"></span>
      <ins><span class="total-price-product-with-discount" style="/*display: none;*/">{{ product.formatted_calculated_basic_price }}</span></ins>
      <div class="discount-bonus-info"></div>
      <button
        type="button"
        class="button button-reveal button-rounded tright fright nomargin product-calculator-order-button hidden-xs hidden-sm hidden-md hidden-lg"
      >
        <span>site/product.button.order</span>
        <i class="icon-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['product']),
  },
}
</script>
