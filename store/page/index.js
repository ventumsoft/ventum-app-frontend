export const state = () => ({
  path: null,
  type: null,
  language: null,
  languages: null,
  widgets: null,
});

export const mutations = {
  set(state, {
    path,
    type,
    language,
    languages,
    widgets,
  }) {
    state.path = path;
    state.type = type;
    state.language = language;
    state.languages = languages;
    state.widgets = widgets;
  }
}
