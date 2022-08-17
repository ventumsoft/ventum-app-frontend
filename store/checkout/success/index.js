export const state = () => ({
  orderNumber: null,
  paymentResult: null,
  documentsExists: null,
  documentsPending: null,
  agentShowcaseUrl: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
  clear(state) {
    state.orderNumber = null;
    state.paymentResult = null;
    state.documentsExists = null;
    state.documentsPending = null;
    state.agentShowcaseUrl = null;
  },
}

export const actions = {
  async fetchOrderResultData({state, commit}, {
    orderNumber,
    paymentResult,
    paymentId,
  }) {
    commit('update', {
      orderNumber,
      paymentResult,
    });
    const {data: resultData} = await this.$axios.get('checkout/result', {params: {
      orderNumber,
      paymentId,
    }});
    commit('update', resultData);
  },
}
