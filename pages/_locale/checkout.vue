<template>
  <fragment>
    <PageTitle
      :title="$trans('checkout.page_title')"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
        {title: $trans('checkout.breadcrumb_title')},
      ]"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div id="processTabs" style="margin-top: 30px;">
            <CheckoutSteps v-if="$route.meta.step" :active="$route.meta.step" />
            <NuxtChild />
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import {mapState} from 'vuex';

export default {
  head() {
    return {
      title: this.$trans('checkout.meta_title'),
      meta: [
        {
          name: 'description',
          content: this.$trans('checkout.meta_description'),
        },
      ],
    };
  },
  computed: {
    ...mapState('cart', ['items']),
  },
  watch: {
    '$auth.user'() {
      if (this.$route.meta.step && (this.$route.meta.step !== 'items')) {
        this.$router.push(this.$page({name: 'checkout/cart'}));
      }
    },
  },
  beforeDestroy() {
    this.$store.dispatch('checkout/clear');
  },
}
</script>
