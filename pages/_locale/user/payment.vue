<template>
  <div class="client-account-item account-billing account-tab-payment">
    <div class="col-md-6">
      <form
        id="billing-form"
        name="billing-form"
        class="nobottommargin"
        @submit.prevent="handlePaymentFormSubmit"
      >
        <div v-if="loading" class="form-process"></div>
        <CheckoutPaymentFields
          v-bind="{
            userTypesFields,
            taxationSystems,
            paymentData,
            errors,
          }"
          :isAllowedChangingUserType="true"
        />
        <button class="button button-rounded button-reveal tright nomargin fright" id="billing-form-submit">
          <i class="icon-save"></i><span>{{ $trans('account.payment.save') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios}) {
    const {data: userTypesFields} = await $axios.get('checkout/payment/user-types-fields');
    const {data: taxationSystems} = await $axios.get('checkout/payment/taxation-systems');
    const {data: paymentData} = await $axios.get('user/payment-data');
    return {
      userTypesFields,
      taxationSystems,
      paymentData,
    };
  },
  data: () => ({
    loading: false,
    errors: null,
  }),
  methods: {
    async handlePaymentFormSubmit() {
      this.loading = true;
      this.errors = null;
      let success;
      try {
        ({data: {success}} = await this.$axios.post('user/payment-data', this.paymentData, {silenceException: true}));
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        return;
      } finally {
        this.loading = false;
      }
      if (success) {
        this.$noty(this.$trans('account.profile.saved'));
      }
    },
  },
}
</script>
