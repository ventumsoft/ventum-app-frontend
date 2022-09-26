export const state = () => ({
  preload: null,
  trans: null,
  settings: null,
  languages: null,
  language: null,
});

export const mutations = {
  preload(state, data) {
    if (!state.preload) {
      state.preload = {};
    }
    for (const [key, value] of Object.entries(data)) {
      state.preload[key] = value;
    }
  },
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}
