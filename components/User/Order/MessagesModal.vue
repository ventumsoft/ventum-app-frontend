<template>
  <BsModal
    ref="modal"
    id="messagesModal"
    class="modaltop fade"
    @closed="$emit('closed')"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-body">
        <div class="modal-content">
          <div class="modal-header bgcolor">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">
              {{ $trans('account.orders.messages.title') }}
              {{ $trans('account.orders.messages.n') }}<span class="nocolor order-number">{{ order.number }}</span>
            </h4>
          </div>
          <div class="modal-body">
            <div id="chat" class="chat-account">
              <div class="panel panel-default">
                <div class="panel-body">
                  <MessengersChatMessages
                    :ticket="ticket"
                  />
                  <form class="nobottommargin clearfix account-orders-message-send-form" @submit.prevent="handleMessageSubmit">
                    <textarea
                      name="message"
                      class="form-control content-group"
                      rows="3"
                      cols="1"
                      :placeholder="$trans('chat.message.placeholder')"
                      :class="{error: errors?.message}"
                      v-model="formData.message"
                    ></textarea>
                    <div class="row">
                      <div class="col-xs-3">
                        <ul class="icons-list">
                          <li>
                            <a
                              class="message-files-button"
                              style="position: relative;"
                              v-bs.tooltip="{
                                title: formData.files?.length ? Array.from(formData.files).map(file => file.name).join('<br>') : $trans('chat.sendfile'),
                                html: true,
                                container: 'body',
                              }"
                            >
                              <i class="icon icon-file-add"></i>
                              <input
                                type="file"
                                multiple
                                style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0;"
                                :accept="$store.state.site.settings?.['helpdesk:upload-files-types']?.map(fileType => '.' + fileType)"
                                @change="handleSelectingFiles"
                              >
                              <span
                                v-if="formData.files?.length"
                                class="badge badge-default message-files-count-badge"
                                style="display: block;"
                              >{{ formData.files.length }}</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="col-xs-9 text-right">
                        <button type="submit" class="button button-rounded button-reveal tright nomargin fright">
                          <i class="icon-email2"></i><span>{{ loading ? $trans('account.orders.messages.sending') : $trans('account.orders.messages.send') }}</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BsModal>
</template>

<script>
export default {
  props: ['order'],
  data: () => ({
    ticket: null,
    formData: {
      message: undefined,
      files: undefined,
    },
    loading: false,
    errors: null,
  }),
  async fetch() {
    ({data: this.ticket} = await this.$axios.get('user/order/ticket', {params: {number: this.order.number}}));
    if (this.ticket) {
      this.listenTicketEchoEvents();
    }
  },
  methods: {
    handleSelectingFiles(event) {
      const files = event.target.files;

      if (files.length > this.$store.state.site.settings?.['upload_count_max']) {
        $(event.target).val('');
        this.$noty(this.$trans('creator-uploader.violation_system_upload_files_count_max').replace(':value', this.$store.state.site.settings?.['upload_count_max']), 'error');
        return;
      }

      if ([...files].reduce((size, file) => size + file.size, 0) > this.$store.state.site.settings?.['upload_size_max']) {
        $(event.target).val('');
        this.$noty(this.$trans('creator-uploader.violation_system_upload_files_size_max').replace(':value', Math.round(this.$store.state.site.settings?.['upload_size_max'] / 1024 / 1024)), 'error');
        return;
      }

      this.formData.files = files;
    },

    async handleMessageSubmit() {
      this.loading = true;
      this.errors = null;

      const formData = new FormData;
      formData.append('number', this.order.number);
      for (const [key, value] of Object.entries(this.formData)) {
        if (value !== undefined) {
          if (value instanceof FileList) {
            for (const [fileIndex, file] of [...value].entries()) {
              formData.append(key + '[' + fileIndex + ']', file);
            }
          } else {
            formData.append(key, value);
          }
        }
      }

      let ticket, message;

      try {
        ({data: {ticket, message}} = await this.$axios.post('user/order/message', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          silenceException: true,
        }));
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        return;
      } finally {
        this.loading = false;
      }

      this.resetFormData();

      if (!this.ticket || (this.ticket.id !== ticket.id)) {
        if (this.ticket) {
          this.stopListeningTicketEchoEvents();
        }
        this.ticket = ticket;
        this.listenTicketEchoEvents();
      }

      this.handleMessageAddingOrUpdating(message);
    },

    resetFormData() {
      this.formData = this.$options.data.apply(this, [this]).formData;
    },

    handleMessageAddingOrUpdating(message) {
      if (!this.ticket.messages) {
        this.$set(this.ticket, 'messages', []);
      }

      const messageIndex = this.ticket.messages.findIndex(iteratedMessage => iteratedMessage.id === message.id);
      if (messageIndex !== -1) {
        this.ticket.messages[messageIndex] = message;
        return;
      }

      this.ticket.messages.push(message);
    },

    listenTicketEchoEvents() {
      this.$echo.private('Api.Site.HelpDesk.Ticket.' + this.ticket.id)
        .listen('HelpDesk.TicketMessageWasBuilded', ({message}) => this.handleMessageAddingOrUpdating(message))
        .listen('HelpDesk.TicketMessageWasUpdated', ({message}) => this.handleMessageAddingOrUpdating(message));
    },

    stopListeningTicketEchoEvents() {
      this.$echo.private('Api.Site.HelpDesk.Ticket.' + this.ticket.id)
        .stopListening('HelpDesk.TicketMessageWasBuilded')
        .stopListening('HelpDesk.TicketMessageWasUpdated');
    },
  },

  beforeDestroy() {
    this.stopListeningTicketEchoEvents();
  },
}
</script>
