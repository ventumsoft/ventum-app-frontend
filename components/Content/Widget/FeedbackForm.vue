<template>
  <div class="container clearfix showcase-widget last-no-margin" data-widget="MainthemFeedbackForm">
    <div class="postcontent nobottommargin">
      <form
        class="nobottommargin contacts-form"
        :data-terms-confirm="is_terms_message_enabled ? $trans('contacts.form.accept_terms_message') : undefined"
        @change="errors = null"
        @input="errors = null"
        @submit.prevent="handleFeedbackSubmit"
      >
        <div v-if="loading" class="form-process" style="display: block;"></div>
        <div class="col_half">
          <label for="template-contactform-name">{{ $trans('contacts.form.name') }} <small>*</small></label>
          <input
            type="text"
            id="template-contactform-name"
            class="form-control required"
            :class="{error: errors?.name}"
            v-model="formData.name"
          >
        </div>
        <div class="col_half col_last">
          <label for="template-contactform-email">{{ $trans('contacts.form.email') }} <small>*</small></label>
          <input
            type="email"
            id="template-contactform-email"
            class="required email form-control"
            :class="{error: errors?.email}"
            v-model="formData.email"
          >
        </div>
        <div class="clear"></div>
        <div v-if="is_phone_enabled" class="col_half">
          <label for="template-contactform-phone">{{ $trans('contacts.form.phone') }}</label>
          <input
            type="text"
            id="template-contactform-phone"
            class="form-control"
            :data-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : ''"
            :placeholder="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask']?.replace('#', '_') : ''"
            :class="{error: errors?.phone}"
            v-model="formData.phone"
          >
        </div>
        <div
          v-if="upload_files_enabled"
          class="col_half col_last"
          :class="{'has-error': errors && Object.keys(errors).find(key => key.startsWith('files.'))}"
        >
          <label for="input-1">{{ $trans('contacts.form.files') }}</label>
          <BsFileInput
            id="input-1"
            type="file"
            class="file-loading"
            multiple
            :options="{
              showUpload: false,
              showCaption: true,
              showPreview: false,
              mainClass: 'input-group-md',
              browseClass: 'btn btn-warning',
              browseIcon: '<i class=icon-folder-open></i>',
              //maxFileCount: integration.embedded.files.maxCount, // env('INPUT_FILE_SIZE')
              //maxFileSize: integration.embedded.files.maxSize / 1024, // env('INPUT_FILE_COUNT')
              //sizeMessage: $trans('common.input.file.size')
              //countMessage: $trans('common.input.file.count')
              allowedFileExtensions: upload_files_types?.map(fileType => '.' + fileType),
            }"
            :accept="upload_files_types?.map(fileType => '.' + fileType)"
            @change.native="formData.files = $event.target.files"
          />
        </div>
        <div class="clear"></div>
        <div class="col_full">
          <label for="template-contactform-message">{{ $trans('contacts.form.message') }} <small>*</small></label>
          <textarea
            class="required form-control"
            id="template-contactform-message"
            rows="6"
            cols="30"
            :class="{error: errors?.message}"
            v-model="formData.message"
          ></textarea>
        </div>
        <div
          v-if="$store.state.site.settings?.['general:is-terms-message-enabled']"
          class="col_full check-control"
          :class="{error: errors?.is_agree_with_terms}"
        >
          <input id="feedback-checkbox-terms" class="checkbox-style" type="checkbox" v-model="formData.is_agree_with_terms">
          <label for="feedback-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['general:terms-message']"></label>
        </div>
        <TheCaptcha
          ref="captcha"
          v-if="is_captcha_enabled"
          v-model="formData.g_recaptcha_response"
          :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
        />
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
          >
            <i class="icon-email2"></i><span>{{ loading ? $trans('chat.sending') : $trans('contacts.form.send') }}</span>
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
  data: ({$auth}) => ({
    CaptchaVersionEnum,
    loading: false,
    formData: {
      name: $auth.user?.name || undefined,
      email: $auth.user?.email || undefined,
      phone: $auth.user?.phone || undefined,
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

      const formData = new FormData;
      formData.append('widgetId', this.$parent.widget.id);
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

      try {
        await this.$auth.getUserOrGuest();
        await this.$axios.post('ticket/message', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          silenceException: true,
        });
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
