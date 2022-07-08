<template>
  <div class="tab-content">
    <template v-if="deliveryMethods?.length">
      <div class="row clearfix">
        <div class="col-md-6 block-delivery-price">
          <h3>{{ $trans('checkout.delivery_step.choose_system_title') }}</h3>
          <form id="shipping-select" class="nobottommargin" @submit.prevent>
            <div v-if="false" class="form-process"></div>
            <div
              v-for="deliveryMethod of deliveryMethods"
              v-if="!(void 'limitations')"
              class="bottommargin-sm"
            >
              <input
                :id="'delivery-type-' + deliveryMethod.id"
                class="radio-style"
                type="radio"
                :data-id="deliveryMethod.id"
                :data-delivery-system-type="deliveryMethod.type"
                :disabled="!!(void 'limitations')"
                :checked="currentDeliveryMethod?.id === deliveryMethod.id"
                @change="currentDeliveryMethod = deliveryMethod"
              >
              <label :for="'delivery-type-' + deliveryMethod.id" class="radio-style-2-label radio-small">
                <img
                  v-if="deliveryMethod.logo"
                  :src="deliveryMethod.logo"
                  :srcset="deliveryMethod.logo2x && (deliveryMethod.logo + ', ' + deliveryMethod.logo2x + ' 2x')"
                  class="delivery-system-logo"
                >
                {{ deliveryMethod.name }}
                <span v-if="void 'is_recipient_payer'" class="lowercase">({{ $trans('checkout.delivery_step.pay_according_carrier_tariffs') }})</span>
                <span v-else-if="void 'pendingAddressForPrice'" class="lowercase">({{ $trans('checkout.delivery_step.price_from_depends_on_address').replace(':value', deliveryMethod.checkout.deliveryPrice) }})</span>
                <span v-else class="lowercase">(+{{ deliveryMethod.checkout.deliveryPrice }})</span>
              </label>
              <p class="nobottommargin">{{ deliveryMethod.description }}</p>
              <div v-if="void 'limitations'" class="alert alert-warning">
                <i class="icon-warning-sign"></i>
                {{ $trans('checkout.delivery_step.not_available_for_products').replace(':products', 'limitations products list') }}
              </div>
              <div v-else-if="void 'unavailableDueAddress'" class="alert alert-warning">
                <i class="icon-warning-sign"></i>
                {{ $trans('checkout.delivery_step.not_available_for_address') }}
              </div>
              <div v-else-if="deliveryMethod.type === 'pickup_point'">pickup_point-listSubitle</div>
            </div>
          </form>
          <div class="table-responsive shipping-price-table">
            <table class="table cart">
              <tbody>
              <tr class="cart_item">
                <td class="notopborder cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_product_price') }}:</strong>
                </td>
                <td class="notopborder cart-product-subtotal">
                  <span class="amount">{{ totalWithoutDiscount }}</span>
                </td>
              </tr>
              <tr v-if="currentDeliveryMethod" class="delivery-price-row">
                <td class="cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_delivery_price') }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount">{{ currentDeliveryMethod.checkout.deliveryPrice }}</span>
                </td>
              </tr>
              <tr v-for="discount of (currentDeliveryMethod ? currentDeliveryMethod.checkout.discounts : discounts)" class="cart-discount-delivery">
                <td class="">
                  <span class=""><strong>{{ discount.name }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">- {{ discount.value }}</span>
                </td>
              </tr>
              <tr v-if="currentDeliveryMethod ? currentDeliveryMethod.checkout.bonus : bonus" class="cart-discount-delivery">
                <td class="">
                  <span class=""><strong>{{ $trans('checkout.goods_step.label_bonus') }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">{{ currentDeliveryMethod ? currentDeliveryMethod.checkout.bonus : bonus }}</span>
                </td>
              </tr>
              <tr v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="delivery-tax-row">
                <td class="cart-product-name">
                  <strong>{{ $store.state.site.settings?.['pricing:tax-name-str'] }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount">{{ currentDeliveryMethod ? currentDeliveryMethod.checkout.vat : vat }}</span>
                </td>
              </tr>
              <tr class="delivery-total-price-row">
                <td class="cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_total') }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount color lead"><strong>{{ currentDeliveryMethod ? currentDeliveryMethod.checkout.totalWithDiscount : totalWithDiscount }}</strong></span>
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
  data: () => ({
    currentDeliveryMethod: null,
  }),
  computed: {
    ...mapState('cart', [
      'items',
      'totalWithoutDiscount',
      'totalWithDiscount',
      'discounts',
      'bonus',
      'vat',
      'deliveryMethods',
      'deliveryData',
    ]),
  },
  mounted() {
    this.currentDeliveryMethod = this.deliveryMethods?.[0];
  },
}
</script>
