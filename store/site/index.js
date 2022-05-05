export const state = () => ({
  trans: null,
  settings: null,
  languages: null,
  language: null,
  widgets: null,
});

export const mutations = {
  set(state, {
    trans,
    settings,
    language,
    languages,
    widgets,
  }) {
    state.trans = trans;
    state.settings = settings;
    state.language = language;
    state.languages = languages;
    state.widgets = widgets;
  },
}
