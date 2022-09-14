export const state = () => ({
  isShowingLoginModal: false,
  loginFrameCallback: null,
  constructorLayoutSaveCallback: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}

export const actions = {
  async callLoginFrameCallbackIfExists({state, commit}, {success, message}) {
    if (!state.loginFrameCallback) {
      return;
    }
    state.loginFrameCallback({success: !message, message});
    commit('update', {loginFrameCallback: null});
  },
}
