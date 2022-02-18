export const state = () => ({
  platform: {
    name: 'Super company name',
    link: 'https://super-company-url'
  },
  name: 'Site display name',
  config: null,
  languages: null,
  language: null,
  widgets: null,
});

export const mutations = {
  set(state, {
    language,
    languages,
    widgets,
  }) {
    state.language = language;
    state.languages = languages;
    state.widgets = widgets;
  }
}
