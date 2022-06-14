export const state = () => ({
  trans: null,
  settings: null,
  languages: null,
  language: null,
  isShowingLoginModal: false,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
  setShowingLoginModal(state, value) {
    state.isShowingLoginModal = value;
  },
}
