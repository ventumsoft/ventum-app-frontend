<template>
  <div class="showcase-widget section last-no-margin" data-widget="MainthemSubscribe">
    <div class="container clearfix">
      <div class="heading-block center">
        <h3 v-html="title"></h3>
        <span v-html="subtitle"></span>
      </div>
      <div id="widget-subscribe-form2-result" data-notify-type="success" data-notify-msg=""></div>
      <form id="widget-subscribe-form2" class="nobottommargin" @submit.prevent="checkSubscriberEmail">
        <div v-if="loading" class="form-process" style="left: 0; top: 0;"></div>
        <div class="divcenter" style="max-width:600px;">
          <div class="input-group input-group-lg">
            <span class="input-group-addon"><i class="icon-email3"></i></span>
            <input
              type="email"
              class="form-control required email"
              :placeholder="$trans('widgets.subscribe.input_email')"
              required
              :class="{error: errors?.email}"
              v-model="formData.email"
            >
            <span class="input-group-btn">
              <button class="btn btn-success" type="submit">{{ $trans('widgets.subscribe.btn') }}</button>
            </span>
          </div>
          <label v-if="errors?.email" class="widget-subscribe-form-email-error" v-html="errors.email?.join('<br />')"></label>
        </div>
      </form>
    </div>
    <BsModal
      ref="modal"
      v-if="isShowingSubscriberModal"
      id="modal-subscribe-block"
      class="fade"
      @closed="isShowingSubscriberModal = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header nobottomborder nobottompadding clearfix">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <div class="modal-body">
            <div class="panel panel-default nobottommargin noborder">
              <div class="panel-body notoppadding">
                <form
                  class="subscribe-form nobottommargin"
                  @submit.prevent="handleSubscriberSubmit"
                >
                  <div v-if="loading" class="form-process" style="left: 0; top: 0;"></div>
                  <div class="col_full">
                    <label>{{ $trans('widgets.subscribe.modal_name') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      :class="{error: errors?.firstname}"
                      v-model="formData.firstname"
                    >
                  </div>
                  <div class="col_full">
                    <label>{{ $trans('widgets.subscribe.modal_surname') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      name="surname"
                      required
                      :class="{error: errors?.surname}"
                      v-model="formData.surname"
                    >
                  </div>
                  <div
                    v-if="$store.state.site.settings?.['general:is-terms-message-enabled']"
                    class="input-group check-control"
                    style="margin-top: 20px;"
                    :class="{error: errors?.is_agree_with_terms}"
                  >
                    <input id="subscribe-checkbox-terms" class="checkbox-style required" type="checkbox" required v-model="formData.is_agree_with_terms">
                    <label for="subscribe-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="terms_message"></label>
                  </div>
                  <TheCaptcha
                    ref="captcha"
                    v-if="is_captcha_enabled"
                    v-model="formData.g_recaptcha_response"
                    :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
                  />
                  <button type="submit" class="button button-rounded nomargin fright">
                    <span>{{ loading ? $trans('chat.sending') : $trans('widgets.subscribe.btn') }}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BsModal>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    subtitle: {type: String},
    terms_message: {type: String},
    is_captcha_enabled: {type: Boolean},
  },
  data: ({$parent}) => ({
    isShowingSubscriberModal: false,
    formData: {
      widgetId: $parent.widget.id,
      email: undefined,
      firstname: undefined,
      surname: undefined,
      is_agree_with_terms: undefined,
      g_recaptcha_response: undefined,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    async checkSubscriberEmail() {
      this.loading = true;
      this.errors = null;

      try {
        await this.$axios.post('subscribe/check', this.formData, {silenceException: true});
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

      this.isShowingSubscriberModal = true;
    },

    async handleSubscriberSubmit() {
      this.loading = true;
      this.errors = null;

      try {
        await this.$axios.post('subscribe/create', this.formData, {silenceException: true});
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        this.$refs.captcha?.resetRepatcha();
        return;
      } finally {
        this.loading = false;
      }

      $(this.$refs.modal.$el).modal('hide');
      this.resetFormData();

      this.$noty('<i class=icon-ok-sign></i> ' + this.$trans('widgets.subscribe.success'), 'success');
    },

    resetFormData() {
      this.formData = this.$options.data.apply(this, [this]).formData;
    },
  },
}
</script>
