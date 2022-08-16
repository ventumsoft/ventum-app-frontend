<template>
  <BsModal id="modal-call-me-form" class="fade" @closed="$emit('closed')">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header nobottomborder nobottompadding clearfix">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title left">{{ $store.state.site.settings?.['helpdesk:call-me-form-title'] }}</h4>
        </div>
        <div class="modal-body">
          <div class="panel panel-default nobottommargin noborder">
            <div class="panel-body notoppadding">
              <form class="call-me-form nobottommargin" @submit.prevent="handleCallMeSubmit">
                <div class="panel-heading nopadding">
                  {{ $store.state.site.settings?.['helpdesk:call-me-form-text'] }}
                </div>
                <div class="col_full">
                  <label for="call-me-name">{{ $trans('forms.all_forms.input_name') }}:</label>
                  <input
                    id="call-me-name"
                    type="text"
                    class="form-control"
                    :class="{error: errors?.name}"
                    v-model="formData.name"
                  >
                </div>
                <div class="col_full">
                  <label for="call-me-phone">{{ $trans('forms.all_forms.input_phone') }}:</label>
                  <input
                    type="text"
                    id="call-me-phone"
                    class="form-control"
                    :placeholder="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask']?.replace(/#/g, '_') : ''"
                    :class="{error: errors?.phone}"
                    v-model="formData.phone"
                    v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : null"
                  >
                </div>
                <button
                  type="submit"
                  class="button button-rounded button-reveal nomargin tright fright"
                  value="submit"
                >
                  <i class="icon-line2-call-in"></i><span>{{ loading ? $trans('chat.sending') : $trans('forms.all_forms.btn_call_me') }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BsModal>
</template>

<script>
export default {
  data: ({$auth}) => ({
    formData: {
      form: 'call-me',
      name: $auth.user?.name,
      phone: $auth.user?.phone,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    async handleCallMeSubmit() {
      this.loading = true;
      this.errors = null;

      try {
        await this.$auth.getUserOrGuest();
        await this.$axios.post('communications/ticket-message', this.formData, {silenceException: true});
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

      this.$noty('<i class=icon-ok-sign></i> ' + this.$trans('call-me.success'), 'success');
      $(this.$el).modal('hide');
    },

    resetFormData() {
      Object.assign(this.$data, this.$options.data.apply(this, [this]));
    },
  },
}
</script>
