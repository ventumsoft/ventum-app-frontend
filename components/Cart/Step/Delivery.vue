<template>
  <div class="tab-content">
    <template v-if="deliveryMethods?.length">
      <div class="row clearfix">
        <div class="col-md-6 block-delivery-price">
          <h3>{{ $trans('checkout.delivery_step.choose_system_title') }}</h3>
          <form id="shipping-select" name="shipping-select" class="nobottommargin" @submit.prevent>
            <div v-if="false" class="form-process"></div>

          </form>
          <div class="table-responsive shipping-price-table">
            <table class="table cart">
              <tbody>
              <tr class="cart_item">
                <td class="notopborder cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_product_price') }}:</strong>
                </td>
                <td class="notopborder cart-product-subtotal">
                  <span class="amount">{{ itemsTotalWithoutDiscount }}</span>
                </td>
              </tr>
              <tr class="delivery-price-row" style="display: none;">
                <td class="cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_delivery_price') }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount"></span>
                </td>
              </tr>
              <tr v-for="discount of (discounts || [])" class="cart-discount-delivery cart-discount-delivery-0">
                <td class="">
                  <span class=""><strong >{{ discount.name }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">- {{ discount.value }}</span>
                </td>
              </tr>
              <tr v-for="discount of (currentDeliveryMethod?.discounts || [])" class="cart-discount-delivery">
                <td class="">
                  <span class=""><strong>{{ discount.name }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">- {{ discount.value }}</span>
                </td>
              </tr>
              <tr v-if="currentDeliveryMethod?.bonus" class="cart-discount-delivery">
                <td class="">
                  <span class=""><strong>{{ $trans('checkout.goods_step.label_bonus') }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">{{ currentDeliveryMethod.bonus }}</span>
                </td>
              </tr>
              <tr v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="delivery-tax-row">
                <td class="cart-product-name">
                  <strong>{{ $store.state.site.settings?.['pricing:tax-name-str'] }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount">{{ vatWithoutDiscount }}</span>
                </td>
              </tr>
              <tr class="delivery-total-price-row">
                <td class="cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_total') }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount color lead"><strong>{{ itemsTotalWithDiscount }}</strong></span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6 shipping-forms">
          <h3>{{ $trans('checkout.delivery_step.buyer_data') }}</h3>
          <div v-if="false" class="row clearfix shipping-not-available">
            <div class="col-lg-12 alert alert-danger">
              <i class="icon-warning-sign"></i>
              {{ $trans('checkout.delivery_step.delivery_not_found') }}
            </div>
            <div v-for="deliveryMethod of deliveryMethods">
              delivery method {{ deliveryMethod.id }} form
            </div>
          </div>
        </div>
      </div>
      <TheLink :to="$page({name: 'checkout/payment'})" class="button button-rounded button-reveal tright nomargin fright disabled">
        <i class="icon-arrow-right2"></i><span>{{ $trans('checkout.delivery_step.next_step_btn') }}</span>
      </TheLink>
      <TheLink :to="$page({name: 'checkout/cart'})" class="button button-rounded button-reveal button-amber notopmargin fright">
        <i class="icon-arrow-left2"></i><span>{{ $trans('checkout.delivery_step.goods_step_btn') }}</span>
      </TheLink>
    </template>
    <div v-else class="row clearfix">
      <div class="col-lg-12 alert alert-danger">{{ $trans('checkout.delivery_step.delivery_not_found') }}</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('cart', [
      'items',
      'itemsTotalWithoutDiscount',
      'itemsTotalWithDiscount',
      'discounts',
      'bonus',
      'vatWithoutDiscount',
      'deliveryMethods',
      'deliveryData',
    ]),
    currentDeliveryMethod() {
      return null;
    },
  },
}
</script>
