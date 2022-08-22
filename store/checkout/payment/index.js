import _pick from 'lodash/pick';

export const state = () => ({
  paymentStepLoading: false,
  deliveryPrice: null,
  paymentSystems: null,
  paymentRoutes: null,
  selectedPaymentSystem: null,
  useBonuses: false,
  userTypesFields: null,
  taxationSystems: null,
  paymentData: null,
  errors: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
    if (('paymentSystems' in data) || ('paymentData' in data)) {
      state.selectedPaymentSystem =
        state.paymentSystems?.find(paymentSystem => paymentSystem.id == state.paymentData?.payment_system_id) ||
        state.paymentSystems?.[0];
    }
  },
  paymentData(state, data) {
    if (!state.paymentData) {
      state.paymentData = {};
    }
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        state.paymentData[key] = value;
      } else {
        delete state.paymentData[key];
      }
    }
  },
  clear(state) {
    state.deliveryPrice = null;
    state.paymentSystems = null;
    state.paymentRoutes = null;
    state.selectedPaymentSystem = null;
    state.useBonuses = false;
    state.userTypesFields = null;
    state.taxationSystems = null;
    state.paymentData = null;
    state.errors = null;
  },
}

export const getters = {
  availablePaymentRoutes: state => state.paymentRoutes?.filter(paymentRoute =>
    ((paymentRoute.userType === 'all') || (paymentRoute.userType === state.paymentData?.type_user)) &&
    ((paymentRoute.taxPayer === 'all') || (paymentRoute.taxPayer === 'tax_payer') && (state.paymentData?.is_vat_payer === 'vat') || (paymentRoute.taxPayer === 'not_tax_payer') && (state.paymentData?.is_vat_payer === 'tax')) &&
    ((paymentRoute.paymentSystemsIds === 'all') || paymentRoute.paymentSystemsIds?.includes(state.selectedPaymentSystem?.id)) &&
    ((paymentRoute.countriesIds === 'all') || paymentRoute.countriesIds?.includes(state.paymentData?.country_id)) &&
    ((paymentRoute.taxationSystemsIds === 'all') || paymentRoute.taxationSystemsIds?.includes(state.paymentData?.taxation_system_id))
  ),
}

export const actions = {
  async fetchPaymentStepData({state, commit}, {withoutPaymentData} = {}) {
    commit('update', {paymentStepLoading: true});
    let data;
    try {
      ({data} = (await this.$axios.post('checkout/step/payment', {
        payment_system_id: state.selectedPaymentSystem?.id,
      }, {progress: false})));
    } catch (exception) {
      return;
    } finally {
      commit('update', {paymentStepLoading: false});
    }
    if (withoutPaymentData) {
      delete data.paymentData;
    }
    commit('update', data);
  },

  async savePaymentData({state, getters, commit}, {paymentDataFields}) {
    commit('update', {errors: null});
    try {
      await this.$axios.post('checkout/payment/data', {
        payment_system_id: state.selectedPaymentSystem?.id,
        payment_route_id: getters.availablePaymentRoutes?.[0]?.id,
        ..._pick(state.paymentData, paymentDataFields),
      }, {silenceException: true});
    } catch (exception) {
      if ('object' === typeof exception.response?.data?.errors) {
        commit('update', {errors: exception.response.data.errors});
      } else {
        this.$noty(exception.response?.data?.message || exception.message, 'error');
      }
      return false;
    }
    return true;
  },
}
