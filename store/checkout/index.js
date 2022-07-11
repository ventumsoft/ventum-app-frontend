export const state = () => ({
  deliveryStepLoading: false,
  deliverySystems: null,
  deliveryData: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
  deliveryData(state, data) {
    if (!state.deliveryData) {
      state.deliveryData = {};
    }
    for (const [key, value] of Object.entries(data)) {
      state.deliveryData[key] = value;
    }
  },
}

export const actions = {
  async fetchDeliveryStepData({state, commit}, {delivery_system_id} = {}) {
    commit('update', {deliveryStepLoading: true});
    let data;
    try {
      ({data} = (await this.$axios.get('checkout/step/delivery', {params: {
        delivery_system_id,
      }})));
    } catch (exception) {
      return;
    } finally {
      commit('update', {deliveryStepLoading: false});
    }
    commit('update', data);
  },
}
