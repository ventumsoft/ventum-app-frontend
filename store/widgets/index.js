export const state = () => ({
  header: null,
  page: null,
  footer: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
  },
}
