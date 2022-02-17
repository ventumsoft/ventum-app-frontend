export const state = () => ({
  path: null,
  language: null,
  languages: null,
  widgets: null,
  type: null,
  entity: null,
});

export const mutations = {
  set(state, {
    path,
    type,
    language,
    languages,
    widgets,
    entity,
  }) {
    state.path = path;
    state.language = language;
    state.languages = languages;
    state.widgets = widgets;
    state.type = type;
    state.entity = entity;
  }
}
