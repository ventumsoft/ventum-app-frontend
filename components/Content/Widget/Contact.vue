<template>
  <div class="showcase-widget col-md-3 hidden-sm hidden-xs" data-widget="MainthemContact">
    <div class="widget quick-contact-widget clearfix">
      <h4>{{ title }}</h4>
      <form
        class="nobottommargin"
        @change="errors = null"
        @input="errors = null"
        @submit.prevent="handleFeedbackSubmit"
      >
        <div v-if="loading" class="form-process"></div>
        <div class="input-group divcenter">
          <span class="input-group-addon"><i class="icon-user"></i></span>
          <input
            type="text"
            class="required form-control input-block-level"
            :placeholder="$trans('forms.all_forms.input_name')"
            :class="{error: errors?.name}"
            @focus="focused = true"
            v-model="formData.name"
          >
        </div>
        <div class="input-group divcenter">
          <span class="input-group-addon"><i class="icon-email3"></i></span>
          <input
            type="text"
            class="required form-control email input-block-level"
            :placeholder="$trans('forms.all_forms.input_email')"
            :class="{error: errors?.email}"
            @focus="focused = true"
            v-model="formData.email"
          >
        </div>
        <textarea
          class="required form-control input-block-level short-textarea"
          rows="4"
          cols="30"
          :placeholder="$trans('forms.all_forms.input_massage')"
          :class="{error: errors?.message}"
          @focus="focused = true"
          v-model="formData.message"
        ></textarea>
        <div
          v-if="$store.state.site.settings?.['general:is-terms-message-enabled']"
          class="input-group check-control"
          :class="{error: errors?.is_agree_with_terms}"
        >
          <input id="footer-checkbox-terms" class="checkbox-style" type="checkbox" v-model="formData.is_agree_with_terms">
          <label for="footer-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="terms_message"></label>
        </div>
        <TheCaptcha
          ref="captcha"
          v-if="is_captcha_enabled && focused"
          v-model="formData.g_recaptcha_response"
          :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
        />
        <button
          type="submit"
          class="button button-rounded button-reveal tright nomargin fright btn-status-write-to-us"
          value="submit"
          :data-loading-text="$trans('chat.sending')"
        >
          <i class="icon-email2"></i><span>{{ $trans('forms.all_forms.btn') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CaptchaVersionEnum from '@/enums/CaptchaVersionEnum';

export default {
  props: {
    widgetId: {type: Number},
    title: {type: String},
    terms_message: {type: String},
    is_captcha_enabled: {type: Boolean},
  },
  data: ({$auth, widgetId}) => ({
    CaptchaVersionEnum,
    focused: false,
    loading: false,
    formData: {
      widgetId,
      name: $auth.user?.name || undefined,
      email: $auth.user?.email || undefined,
      message: undefined,
      is_agree_with_terms: undefined,
      g_recaptcha_response: undefined,
    },
    errors: null,
  }),
  watch: {
    '$auth.user'() {
      this.resetFormData();
    },
  },
  methods: {
    async handleFeedbackSubmit() {
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
        this.$refs.captcha?.resetRepatcha();
        return;
      } finally {
        this.loading = false;
      }

      this.resetFormData();
      this.$noty('<i class=icon-ok-sign></i> ' + this.$trans('contacts.form.success'), 'success');
    },

    resetFormData() {
      Object.assign(this.$data, this.$options.data.apply(this, [this]));
      this.$refs.captcha?.resetRepatcha();
    },
  },
}
</script>
