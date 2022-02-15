export const state = () => ({
  path: null,
  language: null,
  languages: null,
  widgets: null,
});

export const mutations = {
  set(state, {
    path,
    language,
    languages,
    widgets,
  }) {
    state.path = path;
    state.language = language;
    state.languages = languages;
    state.widgets = widgets;
  }
}
