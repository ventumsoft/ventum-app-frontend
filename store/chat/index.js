export const state = () => ({
  mode: null,
  ticket: null,
  welcome: null,
  messageAudio: null,
  messageAudioEnabled: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;

      if ((key === 'messageAudioEnabled') && (typeof localStorage !== 'undefined')) {
        localStorage.setItem('messageAudioEnabled', value ? 'true' : 'false');
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
