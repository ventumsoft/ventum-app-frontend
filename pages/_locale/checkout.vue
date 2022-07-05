<template>
  <fragment>
    <PageTitle
      :title="$trans('checkout.page_title')"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'locale'})},
        {title: $trans('checkout.breadcrumb_title')},
      ]"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div id="processTabs" style="margin-top: 30px;">
            <CartSteps />
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
  data: () => ({
    //
  }),
  async fetch({ store }) {
    if (process.client) {
      await store.dispatch('cart/fetch');
    }
  },
  computed: {
    ...mapState('cart', ['items']),
  },
  mounted() {
    //
  },
}
</script>
