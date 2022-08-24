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
        <template v-if="userTypesFields">
          <div v-if="userTypes?.length > 1" class="col_full">
            <label>{{ $trans('checkout.payment_step.cash_on_delivery.user_type_label') }}</label>
            <div v-for="iteratedUserType of userTypes">
              <input
                type="radio"
                class="radio-style"
                :id="'payment-form-type-user-' + iteratedUserType"
                name="payment-form-type-user"
                :value="iteratedUserType"
                v-model="paymentData.type_user"
              >
              <label
                :for="'payment-form-type-user-' + iteratedUserType"
                class="radio-style-2-label radio-small"
              >{{ $trans('checkout.payment_step.cash_on_delivery.user_type.' + iteratedUserType) }}</label>
            </div>
          </div>
          <input v-else type="hidden" v-model="paymentData.type_user">
          <component
            v-for="(title, field) of userTypesFields[userType]"
            v-if="(field !== 'tax_number') || !userTypesFields[userType]['is_tax_payer']"
            :key="field"
            :is="Fields[upperFirst(camelCase(field))] || 'UserPaymentFieldDefault'"
            :field="field"
            :title="title"
            v-bind="{paymentData, errors}"
          />
        </template>
        <template v-else>
          <UserPaymentFieldIsTaxPayer v-bind="{paymentData, errors}" />
          <UserPaymentFieldCountry v-bind="{paymentData, errors}" />
          <UserPaymentFieldDefault :field="'name'" v-bind="{paymentData, errors}" />
          <UserPaymentFieldDefault :field="'address'" v-bind="{paymentData, errors}" />
          <UserPaymentFieldPhone v-bind="{paymentData, errors}" />
        </template>
        <button class="button button-rounded button-reveal tright nomargin fright" id="billing-form-submit">
          <i class="icon-save"></i><span>{{ $trans('account.payment.save') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

import IsTaxPayer from '@/components/User/Payment/Field/IsTaxPayer';
import Country from '@/components/User/Payment/Field/Country';
import CompanyCountry from '@/components/User/Payment/Field/CompanyCountry';
import Phone from '@/components/User/Payment/Field/Phone';
import TaxationSystem from '@/components/User/Payment/Field/TaxationSystem';

export default {
  async asyncData({$axios}) {
    const {data: {
      userTypesFields,
      paymentData,
    }} = await $axios.get('user/payment-data');
    return {
      userTypesFields,
      paymentData,
    };
  },
  data: () => ({
    Fields: {
      IsTaxPayer,
      Country,
      CompanyCountry,
      Phone,
      TaxationSystem,
    },
    loading: false,
    errors: null,
  }),
  computed: {
    userTypes() {
      return this.userTypesFields ? Object.keys(this.userTypesFields) : null;
    },
    userType() {
      return this.paymentData.type_user || this.userTypes && this.userTypes[0] || null;
    },
  },
  methods: {
    camelCase,
    upperFirst,
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
