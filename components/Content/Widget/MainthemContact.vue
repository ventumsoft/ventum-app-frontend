<template>
  <div class="showcase-widget col-md-3 hidden-sm hidden-xs" data-widget="MainthemContact">
    <div class="widget quick-contact-widget clearfix">
      <h4>{{ title }}</h4>
      <div
        class="footer-contacts-form-result"
        data-notify-type="success"
        data-notify-msg="<i class=icon-ok-sign></i> site/contacts.form.success"
      ></div>
      <form
        class="nobottommargin"
        data-result-target=".footer-contacts-form-result"
        @submit.prevent
      >
        <input type="hidden" name="widget_id" :value="$parent.widget.id">
        <div class="form-process"></div>
        <div class="input-group divcenter">
          <span class="input-group-addon"><i class="icon-user"></i></span>
          <input
            type="text"
            class="required form-control input-block-level"
            name="name"
            value="auth.user.name"
            placeholder="site/forms.all_forms.input_name"
          >
        </div>
        <div class="input-group divcenter">
          <span class="input-group-addon"><i class="icon-email3"></i></span>
          <input
            type="text"
            class="required form-control email input-block-level"
            name="email"
            value="auth.user.email"
            placeholder="site/forms.all_forms.input_email"
          >
        </div>
        <textarea
          class="required form-control input-block-level short-textarea"
          name="message"
          rows="4"
          cols="30"
          placeholder="site/forms.all_forms.input_massage"
        ></textarea>

        <div v-if="$store.state.site.settings?.['general:is-terms-message-enabled']" class="input-group check-control">
          <input hidden name="is-terms-message-enabled" value="">
          <input id="footer-checkbox-terms" class="checkbox-style" type="checkbox" name="is-terms-message-enabled">
          <label for="footer-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="terms_message"></label>
        </div>

        <template v-if="is_captcha_enabled">
          <div v-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V2" class="col_full has-error">
            <div align="center" class="g-recaptcha" data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']"  style="display: none;"></div>
            <div id="form-captcha-error" style="color: red;"></div>
          </div>
          <template v-else-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V3">
            <input type="hidden" class="g-recaptcha-v3" name="g-recaptcha-response" data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key'] ">
            <div id="form-captcha-error" style="color: red;"></div>
          </template>
        </template>

        <button
          type="submit"
          class="button button-rounded button-reveal tright nomargin fright btn-status-write-to-us"
          value="submit"
          data-loading-text="site/chat.sending"
        >
          <i class="icon-email2"></i><span>site/forms.all_forms.btn</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CaptchaVersionEnum from '@/enums/CaptchaVersionEnum';

export default {
  props: {
    title: {type: String},
    terms_message: {type: String},
    is_captcha_enabled: {type: Boolean},
  },
  data: () => ({
    CaptchaVersionEnum,
  }),
}
</script>
