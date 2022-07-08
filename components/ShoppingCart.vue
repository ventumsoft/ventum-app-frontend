<template>
  <div id="top-cart">
    <a href="#" id="top-cart-trigger" @click.prevent="toggleTopCartShowing">
      <i class="icon-shopping-cart"></i>
      <span>{{ items?.length || 0 }}</span>
    </a>
    <div v-if="items" class="top-cart-content">
      <div class="top-cart-title">
        <h4>{{ $trans('order.cart.title') }}</h4>
      </div>
      <div v-if="items.length" class="top-cart-items">
        <div v-for="item of items" class="top-cart-item clearfix">
          <div v-if="item.image" class="top-cart-item-image">
            <img
              :src="item.image"
              :alt="item.name"
              style="max-width: none; object-fit: contain;"
            >
          </div>
          <div v-else class="top-cart-item-image" style="border:none;"></div>
          <div class="top-cart-item-desc">
            <p>{{ item.name }}</p>
            <span class="top-cart-item-price">{{ item.price }}</span>
          </div>
        </div>
      </div>
      <div v-if="items.length" class="top-cart-action clearfix">
        <span class="fleft">
            <span v-if="totalWithoutDiscount !== totalWithDiscount" class="top-checkout-striked-price">{{ totalWithoutDiscount }}</span>
            <span class="top-checkout-price">{{ totalWithDiscount }}</span>
        </span>
        <TheLink v-if="items.length" :to="$page({name: 'checkout/cart'})" class="fright">
          <button class="button button-rounded button-reveal button-small nomargin tright fright">
            <i class="icon-cart"></i>
            <span>{{ $trans('order.cart.order') }}</span>
          </button>
        </TheLink>
      </div>
      <div v-if="!items.length"  class="top-cart-items text-center">
        {{ $trans('order.cart.empty') }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: () => ({
    cartItemsCount: 0,
  }),
  computed: {
    ...mapState('cart', [
      'items',
      'totalWithoutDiscount',
      'totalWithDiscount',
    ]),
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  watch: {
    '$auth.user'() {
      this.$store.dispatch('cart/fetch');
    },
    $route() {
      this.$el.classList.toggle('top-cart-open', false);
    },
  },
  methods: {
    toggleTopCartShowing() {
      //$pagemenu.toggleClass('pagemenu-active', false);
      this.$el.classList.toggle('top-cart-open');
    },
    handleDocumentClick(event) {
      if (!event.target.closest('#top-cart')) {
        this.$el.classList.toggle('top-cart-open', false);
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
}
</script>
