export const state = () => ({
  order: null,
  paymentResult: null,
  agentShowcaseUrl: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}

export const actions = {
  async fetchOrderResultData({state, commit}, {
    orderNumber,
    paymentResult,
    paymentId,
  }) {
    console.log('fetchOrderResultData', {
      orderNumber,
      paymentResult,
      paymentId,
    });
    commit('update', {
      order: {number: orderNumber},
      paymentResult: paymentResult,
      agentShowcaseUrl: null,
    });
  },
}
