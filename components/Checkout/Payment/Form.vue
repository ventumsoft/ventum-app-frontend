<template>
  <form class="nobottommargin payment-type-form" @submit.prevent>
    <div class="control-block">
      <template v-if="userTypesFields">
        <div v-if="userTypes?.length > 1" class="col_full">
          <label>{{ $trans('checkout.payment_step.cash_on_delivery.user_type_label') }}</label>
          <div v-for="iteratedUserType of userTypes">
            <input
              type="radio"
              class="radio-style"
              :id="'payment-form-type-user-' + iteratedUserType"
              name="payment-form-type-user"
              :data-payment-data-field="'type_user'"
              :value="iteratedUserType"
              :checked="iteratedUserType === userType"
              @input="$store.commit('checkout/payment/paymentData', {type_user: iteratedUserType})"
            >
            <label
              :for="'payment-form-type-user-' + iteratedUserType"
              class="radio-style-2-label radio-small"
            >{{ $trans('checkout.payment_step.cash_on_delivery.user_type.' + iteratedUserType) }}</label>
          </div>
        </div>
        <input v-else type="hidden" :data-payment-data-field="'type_user'" :value="userType">
        <component
          v-for="(title, field) of userTypesFields[userType]"
          v-if="(field !== 'tax_number') || !userTypesFields[userType]['is_tax_payer']"
          :key="field"
          :is="Fields[upperFirst(camelCase(field))] || 'CheckoutPaymentFieldDefault'"
          :field="field"
          :title="title"
        />
      </template>
      <template v-else>
        <CheckoutPaymentFieldIsTaxPayer />
        <CheckoutPaymentFieldCountry />
        <CheckoutPaymentFieldDefault :field="'name'" />
        <CheckoutPaymentFieldDefault :field="'address'" />
        <CheckoutPaymentFieldPhone />
      </template>
    </div>
  </form>
</template>

<script>
import {mapState} from 'vuex';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

import IsTaxPayer from './Field/IsTaxPayer';
import Country from './Field/Country';
import CompanyCountry from './Field/CompanyCountry';
import Phone from './Field/Phone';
import TaxationSystem from './Field/TaxationSystem';

export default {
  data: () => ({
    Fields: {
      IsTaxPayer,
      Country,
      CompanyCountry,
      Phone,
      TaxationSystem,
    },
  }),
  computed: {
    ...mapState('checkout/payment', [
      'userTypesFields',
      'paymentData',
    ]),
    userTypes() {
      return this.userTypesFields ? Object.keys(this.userTypesFields) : null;
    },
    userType() {
      return this.paymentData?.type_user || this.userTypes && this.userTypes[0] || null;
    },
  },
  mounted() {
    if (this.userType) {
      this.$store.commit('checkout/payment/paymentData', {type_user: this.userType});
    }
  },
  methods: {
    camelCase,
    upperFirst,
  },
}
</script>
