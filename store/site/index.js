export const state = () => ({
  settings: null,
  languages: null,
  language: null,
  widgets: null,
});

export const mutations = {
  set(state, {
    settings,
    language,
    languages,
    widgets,
  }) {
    state.settings = settings;
    state.language = language;
    state.languages = languages;
    state.widgets = widgets;
  }
}
