<template>
  <fragment>
    <template v-if="userTypesFields">
      <div v-if="userTypes?.length > 1" class="col_full">
        <label>{{ $trans('checkout.payment_step.cash_on_delivery.user_type_label') }}</label>
        <div v-for="iteratedUserType of userTypes">
          <input
            type="radio"
            class="radio-style"
            :id="'payment-form-type-user-' + iteratedUserType"
            name="payment-form-type-user"
            data-payment-data-field="type_user"
            :value="iteratedUserType"
            v-model="paymentData.type_user"
          >
          <label
            :for="'payment-form-type-user-' + iteratedUserType"
            class="radio-style-2-label radio-small"
          >{{ $trans('checkout.payment_step.cash_on_delivery.user_type.' + iteratedUserType) }}</label>
        </div>
      </div>
      <input v-else type="hidden" data-payment-data-field="type_user" :value="userType">
      <component
        v-for="(title, field) of userTypesFields[userType]"
        v-if="(field !== 'tax_number') || !userTypesFields[userType].is_tax_payer"
        :key="field"
        :is="Fields[upperFirst(camelCase(field))] || 'UserPaymentFieldDefault'"
        :field="field"
        :title="title"
        v-bind="{taxationSystems, paymentData, errors}"
      />
    </template>
    <template v-else>
      <UserPaymentFieldIsTaxPayer v-bind="{paymentData, errors}" />
      <UserPaymentFieldCountry v-bind="{paymentData, errors}" />
      <UserPaymentFieldDefault :field="'name'" v-bind="{paymentData, errors}" />
      <UserPaymentFieldDefault :field="'address'" v-bind="{paymentData, errors}" />
      <UserPaymentFieldPhone v-bind="{paymentData, errors}" />
    </template>
  </fragment>
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
  props: [
    'userTypesFields',
    'taxationSystems',
    'paymentData',
    'errors',
  ],
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
    userTypes() {
      return this.userTypesFields ? Object.keys(this.userTypesFields) : null;
    },
    userType() {
      return this.paymentData.type_user || this.userTypes && this.userTypes[0] || null;
    },
  },
  mounted() {
    if (this.userType) {
      this.paymentData.type_user = this.userType;
    }
  },
  methods: {
    camelCase,
    upperFirst,
  },
}
</script>
