<template>
  <div class="container clearfix showcase-widget last-no-margin" data-widget="MainthemFeedbackForm">
    <div class="postcontent nobottommargin">
      <div
        class="contacts-form-result"
        data-notify-type="success"
        :data-notify-msg="'<i class=icon-ok-sign></i>' + $trans('contacts.form.success')"
      ></div>
      <form
        method="post"
        class="nobottommargin contacts-form"
        data-result-target=".contacts-form-result"
        :data-terms-confirm="is_terms_message_enabled ? $trans('contacts.form.accept_terms_message') : undefined"
      >
        <input type="hidden" name="widget_id" :value="$parent.widget.id">
      <div class="form-process"></div>
      <div class="col_half">
        <label for="template-contactform-name">{{ $trans('contacts.form.name') }} <small>*</small></label>
        <input
          type="text"
          id="template-contactform-name"
          name="name"
          value="Auth.user.name"
          class="form-control required"
        >
      </div>
      <div class="col_half col_last">
        <label for="template-contactform-email">{{ $trans('contacts.form.email') }} <small>*</small></label>
        <input
          type="email"
          id="template-contactform-email"
          name="email"
          class="required email form-control"
          value="Auth.user.email"
        >
      </div>
      <div class="clear"></div>

      <div v-if="is_phone_enabled" class="col_half ">
        <label for="template-contactform-phone">{{ $trans('contacts.form.phone') }}</label>
        <input
          type="text"
          id="template-contactform-phone"
          name="phone"
          value="Auth.user.phone"
          class="form-control"
          :data-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : ''"
          :placeholder="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask']?.replace('#', '_') : ''"
        >
      </div>

      <div v-if="upload_files_enabled" class="col_half col_last">
        <label for="input-1">{{ $trans('contacts.form.files') }}</label>
        <input
          id="input-1"
          type="file"
          name="files[]"
          class="file-loading"
          multiple
          data-show-upload="false"
          data-show-caption="true"
          data-show-preview="false"
          data-size="env('INPUT_FILE_SIZE')"
          data-count="env('INPUT_FILE_COUNT')"
          :data-size-message="$trans('common.input.file.size')"
          :data-count-message="$trans('common.input.file.count')"
          :accept="upload_files_types?.length ? upload_files_types.map(fileType => '.' + fileType) : ''"
        >
      </div>

      <div class="clear"></div>
      <div class="col_full">
        <label for="template-contactform-message">{{ $trans('contacts.form.message') }} <small>*</small></label>
        <textarea class="required form-control" id="template-contactform-message" name="message" rows="6" cols="30"></textarea>
      </div>

      <div v-if="$store.state.site.settings?.['general:is-terms-message-enabled']" class="col_full check-control">
        <input hidden name="is-terms-message-enabled" value="">
        <input id="feedback-checkbox-terms" class="checkbox-style" type="checkbox" name="is-terms-message-enabled">
        <label for="feedback-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['general:terms-message']"></label>
      </div>

      <template v-if="is_captcha_enabled">
        <div v-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V2" class="col_full has-error">
          <div align="center" class="g-recaptcha" :data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']"></div>
          <div id="form-captcha-error" style="color: red;"></div>
        </div>
        <template v-else-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V3">
          <input type="hidden" class="g-recaptcha-v3" name="g-recaptcha-response" :data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']" />
          <div id="form-captcha-error" style="color: red;"></div>
        </template>
      </template>

      <div v-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V3" class="col_full google-captcha-agreement">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>

      <div class="col_full">
        <button
          class="button button-rounded button-reveal tright nomargin"
          type="submit"
          value="submit"
          :data-loading-text="$trans('chat.sending')"
        >
          <i class="icon-email2"></i><span>{{ $trans('contacts.form.send') }}</span>
        </button>
      </div>
      </form>
    </div>

    <div class="sidebar col_last nobottommargin">
      <h4>{{ $trans('contacts.contacts') }}</h4>
      <div itemscope itemtype="http://schema.org/PostalAddress">
        <p v-if="contact_details" itemprop="streetAddress" v-html="$nl2br(contact_details)"></p>
        <span
          v-if="$store.state.site.settings?.['general:contacts-phone-one-number']"
          itemprop="telephone"
          class="phones"
        >
          <strong
            v-if="$store.state.site.settings?.['general:contacts-phone-one-prefix']"
            v-html="$store.state.site.settings['general:contacts-phone-one-prefix']"
          ></strong>
          <a :href="'tel:' + $store.state.site.settings['general:contacts-phone-one-number']"> {{ $store.state.site.settings['general:contacts-phone-one-number'] }}</a>
          <br/>
        </span>
        <span
          v-if="$store.state.site.settings?.['general:contacts-phone-two-number']"
          itemprop="telephone"
          class="phones"
        >
          <strong
            v-if="$store.state.site.settings?.['general:contacts-phone-two-prefix']"
            v-html="$store.state.site.settings['general:contacts-phone-two-prefix']"
          ></strong>
          <a :href="'tel:' + $store.state.site.settings['general:contacts-phone-two-number']"> {{ $store.state.site.settings['general:contacts-phone-two-number'] }}</a>
          <br/>
        </span>
        <span
          v-if="$store.state.site.settings?.['general:contacts-phone-three-number']"
          itemprop="telephone"
          class="phones"
        >
          <strong
            v-if="$store.state.site.settings?.['general:contacts-phone-three-prefix']"
            v-html="$store.state.site.settings['general:contacts-phone-three-prefix']"
          ></strong>
          <a :href="'tel:' + $store.state.site.settings['general:contacts-phone-three-number']"> {{ $store.state.site.settings['general:contacts-phone-three-number'] }}</a>
          <br/>
        </span>
      </div>

      <div class="widget noborder notoppadding">
        <a
          v-if="$store.state.site.settings?.['general:sn-links-facebook']"
          :href="$store.state.site.settings['general:sn-links-facebook']"
          class="social-icon si-dark si-facebook"
          target="_blank"
        >
          <i class="icon-facebook"></i>
          <i class="icon-facebook"></i>
        </a>
        <a
          v-if="$store.state.site.settings?.['general:sn-links-vk']"
          :href="$store.state.site.settings['general:sn-links-vk']"
          class="social-icon si-dark si-vk"
          target="_blank"
        >
          <i class="icon-vk"></i>
          <i class="icon-vk"></i>
        </a>
        <a
          v-if="$store.state.site.settings?.['general:sn-links-twitter']"
          :href="$store.state.site.settings['general:sn-links-twitter']"
          class="social-icon si-dark si-twitter"
          target="_blank"
        >
          <i class="icon-twitter"></i>
          <i class="icon-twitter"></i>
        </a>
        <a
          v-if="$store.state.site.settings?.['general:sn-links-google-plus']"
          :href="$store.state.site.settings['general:sn-links-google-plus']"
          class="social-icon si-dark si-gplus"
          target="_blank"
        >
          <i class="icon-gplus"></i>
          <i class="icon-gplus"></i>
        </a>
        <a
          v-if="$store.state.site.settings?.['general:sn-links-instagram']"
          :href="$store.state.site.settings['general:sn-links-instagram']"
          class="social-icon si-dark si-instagram"
          target="_blank"
        >
          <i class="backicon-instagram2"></i>
          <i class="backicon-instagram2"></i>
        </a>
        <a
          v-if="$store.state.site.settings?.['general:sn-links-youtube']"
          :href="$store.state.site.settings['general:sn-links-youtube']"
          class="social-icon si-dark si-youtube"
          target="_blank"
        >
          <i class="backicon-youtube"></i>
          <i class="backicon-youtube"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import CaptchaVersionEnum from '@/enums/CaptchaVersionEnum';

export default {
  props: {
    is_phone_enabled: {type: Boolean},
    is_terms_message_enabled: {type: Boolean},
    contact_details: {type: String},
    is_captcha_enabled: {type: Boolean},
    upload_files_enabled: {type: Boolean},
    upload_files_types: {type: Array},
  },
  data: () => ({
    CaptchaVersionEnum,
  }),
}
</script>
