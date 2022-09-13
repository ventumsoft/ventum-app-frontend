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
