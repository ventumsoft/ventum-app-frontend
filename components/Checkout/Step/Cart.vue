<template>
  <div class="tab-content">
    <form id="cart-from" v-if="items?.length" @submit.prevent>
      <table class="table cart table-responsive">
        <thead>
        <tr class="hidden-xs">
          <th class="cart-product-remove">&nbsp;</th>
          <th class="cart-product-thumbnail"></th>
          <th class="cart-product-name">{{ $trans('checkout.goods_step.table_product_name') }}</th>
          <th class="cart-product-price"></th>
          <th class="cart-product-quantity"></th>
          <th class="cart-product-subtotal" width="150px">{{ $trans('checkout.goods_step.table_subtotal') }}</th>
        </tr>
        <tr class="visible-xs">
          <th class="cart-product-remove">&nbsp;</th>
          <th class="cart-product-name" colspan="3">{{ $trans('checkout.goods_step.table_product_name') }}</th>
          <th class="cart-product-subtotal" colspan="2" width="150px">{{ $trans('checkout.goods_step.table_subtotal') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item of items" class="cart_item" :data-id="item.id">
          <td class="cart-product-remove">
            <a
              href="#"
              class="remove"
              :title="$trans('checkout.goods_step.remove_btn_title')"
              @click.prevent="removeCartItem(item)"
            ><i class="icon-trash2"></i></a>
          </td>
          <td class="cart-product-thumbnail hidden-xs">
            <a v-if="item.image" :href="item.image" v-mfp:image>
              <img :src="item.image" :alt="item.name">
            </a>
            <div v-else style="height: 104px;"></div>
          </td>
          <td class="cart-product-name text-break" colspan="3">
            <span>{{ item.name }}</span>
            <span v-if="item.optionsNames?.length" v-html="'(' + item.optionsNames.join('; ') + ')'"></span>
          </td>
          <td class="cart-product-subtotal text-nowrap hidden-xs">
            <span class="amount">{{ item.price }}</span>
          </td>
          <td class="cart-product-subtotal text-nowrap visible-xs" colspan="2">
            <span class="amount">{{ item.price }}</span>
          </td>
        </tr>
        <tr v-if="$store.state.site.settings?.['order-settings:show-apply-coupon-button']" class="cart_coupon">
          <td colspan="4">
            <div class="row clearfix">
              <div class="col-md-12 col-xs-12 nopadding">
                <div class="col-md-8 col-xs-7 nopadding">
                  <input
                    type="text"
                    class="form-control coupon-value"
                    :placeholder="$trans('checkout.goods_step.coupon_placeholder') + '..'"
                    :class="{disabled: applyingCoupon}"
                    v-model="couponCode"
                  >
                </div>
                <div class="col-md-4 col-xs-5">
                  <a
                    href="#"
                    class="button button-small button-rounded button-reveal nomargin tright btn-apply-coupon"
                    :class="{disabled: applyingCoupon}"
                    @click.prevent="applyCoupon(couponCode)"
                  >
                    <i class="icon-gift"></i><span>{{ $trans('checkout.goods_step.btn_apply_coupon') }}</span>
                  </a>
                </div>
                <div v-if="applyingCoupon" class="form-process" style="left: 0;"></div>
              </div>
            </div>
          </td>
          <td class="cart-product-quantity">
            <span class=""><strong ></strong></span>
          </td>
          <td class="cart-product-subtotal ">
            <span class="amount"><strong></strong></span>
          </td>
        </tr>
        <tr v-for="discount of (discounts || [])" class="cart_discounts">
          <td class="noborder hidden-xs" colspan="4">
          </td>
          <td class="cart-product-quantity">
            <span class=""><strong >{{ discount.name }}:</strong></span>
          </td>
          <td class="cart-product-subtotal ">
            <span class="amount"><strong> - {{ discount.value }}</strong></span>
          </td>
        </tr>
        <tr v-if="bonus" class="cart_bonus">
          <td class="noborder hidden-xs" colspan="4">
          </td>
          <td class="cart-product-quantity">
            <span class=""><strong >{{ $trans('checkout.goods_step.label_bonus') }}:</strong></span>
          </td>
          <td class="cart-product-subtotal ">
            <span class="amount"><strong>{{ bonus }}</strong></span>
          </td>
        </tr>
        <tr v-if="$store.state.site.settings?.['pricing:is-taxpayer']" class="cart_tax">
          <td class="noborder hidden-xs" colspan="4"></td>
          <td class="visible-xs" colspan="4"></td>
          <td class="cart-product-quantity">
            <strong>{{ $store.state.site.settings?.['pricing:tax-name-str'] }}:</strong>
          </td>
          <td class="cart-product-subtotal">
            <span class="amount"><strong>{{ vat }}</strong></span>
          </td>
        </tr>
        <tr class="cart_total">
          <td class="noborder hidden-xs" colspan="4"></td>
          <td class="noborder visible-xs" colspan="4"></td>
          <td class="cart-product-quantity">
            <strong>{{ $trans('checkout.goods_step.total') }}</strong>
          </td>
          <td class="cart-product-subtotal">
            <span class="amount color lead"><strong>{{ totalWithDiscount }}</strong></span>
          </td>
        </tr>
        <tr class="">
          <td class="noborder" colspan="6">
            <div class="row clearfix">
              <TheLink :to="$page({name: 'checkout/delivery'})" :class="'button button-rounded button-reveal tright nomargin fright ' + (!items?.length ? 'disabled' : '')">
                <i class="icon-arrow-right2"></i><span>{{ $trans('checkout.goods_step.next_step_btn') }}</span>
              </TheLink>
              <TheLink :to="$page({name: 'index'})" class="button button-rounded button-reveal  button-amber notopmargin fright">
                <i class="icon-arrow-left2"></i><span>{{ $trans('checkout.goods_step.order_more_btn') }}</span>
              </TheLink>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </form>
    <div v-else class="cart-empty-block">
      <div class="alert alert-info">{{ $trans('checkout.empty_cart') }}</div>
      <div class="row clearfix">
        <div class="col-md-12">
          <TheLink :to="$page({name: 'index'})" class="button button-rounded button-reveal button-amber notopmargin pull-right">
            <i class="icon-arrow-left2"></i>
            <span>{{ $trans('checkout.goods_step.order_more_btn') }}</span>
          </TheLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: ({$store}) => ({
    couponCode: $store.state.cart.couponCode,
    applyingCoupon: false,
  }),
  computed: {
    ...mapState('cart', [
      'items',
      'totalWithDiscount',
      'discounts',
      'bonus',
      'vat',
    ]),
  },
  methods: {
    async removeCartItem(item) {
      if (!await this.$confirm({
        mainTitle: this.$trans('default.confirmation.are_you_sure'),
        mainSubTitle: this.$trans('checkout.remove_item_confirm_text'),
        mainYesBtn: this.$trans('default.confirmation.yes_remove'),
        mainNoBtn: this.$trans('default.confirmation.no_cancel'),
        yesTitle: this.$trans('default.confirmation.deleted'),
        yesSubTitle: this.$trans('default.confirmation.item_deleted'),
        noTitle: this.$trans('default.confirmation.canceled'),
        noSubTitle: this.$trans('default.confirmation.item_not_deleted'),
      })) {
        return;
      }
      await this.$axios.delete('cart/remove', {params: {id: item.id}});
      await this.$store.dispatch('cart/fetch', {checkout: true});
    },
    async applyCoupon(coupon) {
      this.applyingCoupon = true;
      let success;
      try {
        ({data: {success}} = await this.$axios.post('cart/coupon', {coupon}, {progress: false}));
      } catch (exception) {
        this.$noty(exception.response?.data?.message || exception.message, 'error');
        return;
      } finally {
        this.applyingCoupon = false;
      }
      if (success) {
        this.$toastr('<i class="icon-ok-sign"></i> ' + this.$trans('checkout.message.coupon_apply_success'), 'success');
      } else {
        this.$toastr('<i class="icon-exclamation"></i> ' + this.$trans('checkout.message.coupon_apply_not_found'), 'error');
      }
      await this.$store.dispatch('cart/fetch', {checkout: true});
    },
  },
}
</script>
