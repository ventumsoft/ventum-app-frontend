export const state = () => ({
  email: null,
  code: null,
  check: null,
});

export const mutations = {
  set: (state, {email, code, check}) => {
    state.email = email;
    state.code = code;
    state.check = check;
  },
}
