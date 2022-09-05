export const state = () => ({
  orderNumber: null,
  paymentId: null,
  paymentResult: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
  clear(state) {
    state.orderNumber = null;
    state.paymentId = null;
    state.paymentResult = null;
  },
}
