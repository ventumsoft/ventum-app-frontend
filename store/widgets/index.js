export const state = () => ({
  preload: null,
  header: null,
  page: null,
  footer: null,
  isLoadedPageRemnantMiddleWidgets: null,
});

export const mutations = {
  preload(state, data) {
    if (!state.preload) {
      state.preload = {};
    }
    for (const [key, value] of Object.entries(data)) {
      state.preload[key] = value;
    }
  },
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
    }
    if ('page' in data) {
      state.isLoadedPageRemnantMiddleWidgets = null;
    }
  },
  push(state, {type, location, widgets}) {
    for (const widget of widgets) {
      state[type][location].push(widget);
    }
  },
}

export const actions = {
  async loadPageRemnantMiddleWidgetsIfNeeded({state, commit, rootState}) {
    if (!rootState.site.settings?.['general:widgets-via-ajax'] || !state.page?.middle?.length || state.isLoadedPageRemnantMiddleWidgets) {
      return;
    }
    commit('update', {isLoadedPageRemnantMiddleWidgets: true});
    const {onPageLoadedAndInteracted} = await import('@/plugins/load-interacted.client.js');
    await new Promise(resolve => onPageLoadedAndInteracted(event => resolve()));
    const {data: widgets} = await this.$axios.get('page/remnant-middle-widgets', {params: {slug: rootState.page.slug}});
    commit('push', {
      type: 'page',
      location: 'middle',
      widgets,
    });
  }
}
