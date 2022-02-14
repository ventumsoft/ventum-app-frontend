export const state = () => ({
  path: null,
  data: null,
});

export const mutations = {
  set(state, {path, data}) {
    state.path = path;
    state.data = data;
  }
}
