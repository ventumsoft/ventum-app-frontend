export const state = () => ({
  showing: false,
  query: null,
  loading: false,
  sectionsData: null,
  sectionData: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;

      if ((key === 'showing') && !value) {
        state.query = null;
        state.loading = false;
        state.sectionsData = null;
        state.sectionData = null;
      }

      if ((key === 'showing') && value) {
        state.loading = true;
      }
    }
  },

  message(state, message) {
    const ticket = state.ticket;
    if (ticket.messages === undefined) {
      ticket.messages = [];
    }
    const messageIndex = ticket.messages.findIndex(iteratedMessage => iteratedMessage.id === message.id);
    if (messageIndex !== -1) {
      ticket.messages[messageIndex] = message;
      return;
    }
    ticket.messages.push(message);
    if (!message.own && state.messageAudioEnabled && state.messageAudio) {
      state.messageAudio.play();
    }
  },

  increaseTicketSecondsFromLastReply(state) {
    if (typeof state.ticket?.secondsFromLastReply === 'number') {
      state.ticket.secondsFromLastReply++;
    }
  },
}

let abortController;

export const actions = {
  async fetch({state, commit}, {section, page} = {}) {
    if (!state.query) {
      return;
    }
    if (abortController) {
      abortController.abort();
    }
    commit('update', {loading: true});
    abortController = new AbortController;
    let sectionsData, sectionData;
    try {
      ({data: {sectionsData, sectionData}} = await this.$axios.post('search', {
        query: state.query,
        section: section || undefined,
        page: page || undefined,
      }, {signal: abortController.signal}));
    } catch (exception) {
      //
    } finally {
      abortController = null;
      commit('update', {loading: false});
    }
    commit('update', sectionData ? {sectionData} : {sectionsData, sectionData});
  },
}
