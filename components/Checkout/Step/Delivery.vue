<template>
  <div class="tab-content">
    <template v-if="deliverySystems?.length">
      <div class="row clearfix">
        <div class="col-md-6 block-delivery-price">
          <h3>{{ $trans('checkout.delivery_step.choose_system_title') }}</h3>
          <form id="shipping-select" class="nobottommargin" @submit.prevent>
            <div v-if="deliveryStepLoading" class="form-process"></div>
            <div
              v-for="deliverySystem of deliverySystems"
              class="bottommargin-sm"
            >
              <input
                :id="'delivery-type-' + deliverySystem.id"
                class="radio-style"
                type="radio"
                :data-id="deliverySystem.id"
                :data-delivery-system-type="deliverySystem.type"
                :checked="selectedDeliverySystem?.id === deliverySystem.id"
                @change="changeDeliverySystem(deliverySystem)"
              >
              <label :for="'delivery-type-' + deliverySystem.id" class="radio-style-2-label radio-small">
                <img
                  v-if="deliverySystem.logo"
                  :src="deliverySystem.logo"
                  :srcset="deliverySystem.logo2x && (deliverySystem.logo + ', ' + deliverySystem.logo2x + ' 2x')"
                  class="delivery-system-logo"
                >
                {{ deliverySystem.name }}
                <span v-if="deliverySystem.checkout.isRecipientPayer" class="lowercase">({{ $trans('checkout.delivery_step.pay_according_carrier_tariffs') }})</span>
                <span v-else-if="deliverySystem.checkout.pendingAddressForPrice" class="lowercase">({{ $trans('checkout.delivery_step.price_from_depends_on_address').replace(':value', deliverySystem.checkout.deliveryPrice) }})</span>
                <span v-else class="lowercase">(+{{ deliverySystem.checkout.deliveryPrice }})</span>
              </label>
              <p class="nobottommargin">{{ deliverySystem.description }}</p>
              <div v-if="deliverySystem.checkout.unavailableDueAddress" class="alert alert-warning">
                <i class="icon-warning-sign"></i>
                {{ $trans('checkout.delivery_step.not_available_for_address') }}
              </div>
              <CheckoutDeliveryPickupPointListSubTitle
                v-else-if="deliverySystem.pickupPoint"
                v-bind="{deliverySystem}"
              />
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
              <tr v-if="selectedDeliverySystem && !selectedDeliverySystem.checkout.isRecipientPayer" class="delivery-price-row">
                <td class="cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_delivery_price') }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount">{{ selectedDeliverySystem.checkout.pendingAddressForPrice ? $trans('checkout.delivery_step.price_from_depends_on_address').replace(':value', selectedDeliverySystem.checkout.deliveryPrice) : selectedDeliverySystem.checkout.deliveryPrice }}</span>
                </td>
              </tr>
              <tr v-for="discount of (selectedDeliverySystem ? selectedDeliverySystem.checkout.discounts : discounts)" class="cart-discount-delivery">
                <td class="">
                  <span class=""><strong>{{ discount.name }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">- {{ discount.value }}</span>
                </td>
              </tr>
              <tr v-if="selectedDeliverySystem ? selectedDeliverySystem.checkout.bonus : bonus" class="cart-discount-delivery">
                <td class="">
                  <span class=""><strong>{{ $trans('checkout.goods_step.label_bonus') }}:</strong></span>
                </td>
                <td class="cart-product-subtotal ">
                  <span class="amount">{{ selectedDeliverySystem ? selectedDeliverySystem.checkout.bonus : bonus }}</span>
                </td>
              </tr>
              <tr v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="delivery-tax-row">
                <td class="cart-product-name">
                  <strong>{{ $store.state.site.settings?.['pricing:tax-name-str'] }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount">{{ selectedDeliverySystem ? selectedDeliverySystem.checkout.vat : vat }}</span>
                </td>
              </tr>
              <tr class="delivery-total-price-row">
                <td class="cart-product-name">
                  <strong>{{ $trans('checkout.delivery_step.table_total') }}:</strong>
                </td>
                <td class="cart-product-subtotal">
                  <span class="amount color lead"><strong>{{ selectedDeliverySystem ? selectedDeliverySystem.checkout.totalWithDiscount : totalWithDiscount }}</strong></span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6 shipping-forms">
          <h3>{{ $trans('checkout.delivery_step.buyer_data') }}</h3>
          <component
            v-if="selectedDeliverySystem && deliverySystemFormComponentByType[selectedDeliverySystem.type]"
            :is="deliverySystemFormComponentByType[selectedDeliverySystem.type]"
          />
        </div>
      </div>
      <TheLink :to="$page({name: 'checkout/payment'})" :class="'button button-rounded button-reveal tright nomargin fright ' + (selectedDeliverySystem.checkout.pendingAddressForPrice ? 'disabled' : '')">
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
import DeliverySystemTypeEnum from '@/enums/DeliverySystemTypeEnum';
import UniversalCalc from '@/components/Checkout/Delivery/UniversalCalc';
import PickupPoint from '@/components/Checkout/Delivery/PickupPoint';
import VirtualProduct from '@/components/Checkout/Delivery/VirtualProduct';
import NovaPoshta from '@/components/Checkout/Delivery/NovaPoshta';
import NovaPoshtaCourier from '@/components/Checkout/Delivery/NovaPoshtaCourier';
import ApiShipToPoint from '@/components/Checkout/Delivery/ApiShipToPoint';
import ApiShipToDoor from '@/components/Checkout/Delivery/ApiShipToDoor';
import EvropochtaToPoint from '@/components/Checkout/Delivery/EvropochtaToPoint';
import EvropochtaToDoor from '@/components/Checkout/Delivery/EvropochtaToDoor';
import Ups from '@/components/Checkout/Delivery/Ups';
import {mapState} from 'vuex';

export default {
  data: () => ({
    DeliverySystemTypeEnum,
    deliverySystemFormComponentByType: {
      [DeliverySystemTypeEnum.UNIVERSAL_CALC]: UniversalCalc,
      [DeliverySystemTypeEnum.PICKUP_POINT]: PickupPoint,
      [DeliverySystemTypeEnum.VIRTUAL_PRODUCT]: VirtualProduct,
      [DeliverySystemTypeEnum.NOVA_POSHTA]: NovaPoshta,
      [DeliverySystemTypeEnum.NOVA_POSHTA_COURIER]: NovaPoshtaCourier,
      [DeliverySystemTypeEnum.API_SHIP_TO_POINT]: ApiShipToPoint,
      [DeliverySystemTypeEnum.API_SHIP_TO_DOOR]: ApiShipToDoor,
      [DeliverySystemTypeEnum.EVROPOCHTA_TO_POINT]: EvropochtaToPoint,
      [DeliverySystemTypeEnum.EVROPOCHTA_TO_DOOR]: EvropochtaToDoor,
      [DeliverySystemTypeEnum.UPS]: Ups,
    },
  }),
  computed: {
    ...mapState('cart', [
      'items',
      'totalWithoutDiscount',
      'totalWithDiscount',
      'discounts',
      'bonus',
      'vat',
    ]),
    ...mapState('checkout', [
      'deliveryStepLoading',
      'deliverySystems',
      'selectedDeliverySystem',
      'deliveryData',
    ]),
  },
  methods: {
    async changeDeliverySystem(deliverySystem) {
      this.$store.commit('checkout/update', {selectedDeliverySystem: deliverySystem});
      this.$store.commit('checkout/deliveryData', {delivery_system_id: deliverySystem.id, city: null, warehouse: null, street: null});
      await this.$store.dispatch('checkout/fetchDeliveryStepData', {withoutDeliveryData: true});
    },
  },
}
</script>
