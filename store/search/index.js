export const state = () => ({
  showing: false,
  query: null,
});

export const mutations = {
  update(state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value;
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
