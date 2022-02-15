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
    state.language = language,
    state.languages = languages;
    state.widgets = widgets;
  }
}

export const getters = {
  widgetsGroupedByName: state => {
    if (!state.widgets) {
      return;
    }
    const result = {};
    const allWidgets = state.widgets;
    for (const [type, typeWidgets] of Object.entries(allWidgets)) {
      if (!typeWidgets) {
        continue;
      }
      if (!result[type]) {
        result[type] = {};
      }
      for (const [location, locationWidgets] of Object.entries(typeWidgets)) {
        if (!locationWidgets) {
          continue;
        }
        if (!result[type][location]) {
          result[type][location] = {};
        }
        for (const widget of locationWidgets) {
          result[type][location][widget.class_name] = widget;
        }
      }
    }
    return result;
  },
}
