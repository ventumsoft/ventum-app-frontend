<template>
  <div class="panel panel-default nobottommargin noborder">
    <div class="panel-body">
      <form id="register-form" name="register-form" class="nobottommargin" @submit.prevent="handleRegisterSubmit">
        <div v-if="$store.state.site.settings?.['registration:use-name-surname-enabled']" class="row">
          <div class="col-md-6">
            <div class="col_full">
              <label for="register-form-name">
                {{ $trans('auth.login_register_modal.register_tab.name') }}
              </label>
              <input type="text" id="register-form-name" value="" class="form-control" v-model="credentials.firstname" />
              <label hidden id="registration-register-form-name-error" class="registration-message-error"></label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col_full">
              <label for="register-form-surname">
                {{ $trans('auth.login_register_modal.register_tab.surname') }}
              </label>
              <input type="text" id="register-form-surname" value="" class="form-control" v-model="credentials.surname" />
              <label hidden id="registration-register-form-surname-error" class="registration-message-error"></label>
            </div>
          </div>
        </div>
        <div class="col_full">
          <label for="email">
            {{ $trans('auth.login_register_modal.register_tab.email') }}
          </label>
          <input type="text" class="form-control" id="email" v-model="credentials.email" />
          <label v-if="errors?.email" id="registration-email-error" class="registration-message-error" v-html="errors.email?.join('<br/>') || errors.email"></label>
        </div>
        <div v-if="$store.state.site.settings?.['registration:use-mobile-phone-enabled']" class="col_full">
          <label for="register-form-phone">
            {{ $trans('auth.login_register_modal.register_tab.phone') }}
          </label>
          <input
            :data-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : ''"
            type="text"
            id="register-form-phone"
            class="form-control"
            v-model="credentials.phone"
          />
          <label v-if="errors?.phone" id="registration-register-form-phone-error" class="registration-message-error" v-html="errors.phone?.join('<br/>') || errors.phone"></label>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="col_full">
              <label for="password">
                {{ $trans('auth.login_register_modal.register_tab.password') }}
              </label>
              <input type="password" class="form-control" id="password" v-model="credentials.password" />
              <label hidden id="registration-password-error" class="registration-message-error"></label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col_full">
              <label for="password_confirmation">
                {{ $trans('auth.login_register_modal.register_tab.repassword') }}
              </label>
              <input type="password" class="form-control" id="password_confirmation" v-model="credentials.password_confirmation" />
              <label hidden id="registration-password_confirmation-error" class="registration-message-error"></label>
            </div>
          </div>
          <template v-if="$store.state.site.settings?.['seo-integration:captcha:enabled'] && $store.state.site.settings?.['registration:use-google-captcha-enabled']">
            <div v-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V2" class="col_full has-error">
              <div align="center" class="g-recaptcha" :data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']"></div>
              <div align="center">
                <span id="form-captcha-error" style="color:red"></span>
              </div>
            </div>
            <div v-else-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V3" class="col_full" style="display: none;">
              <input type="hidden" class="g-recaptcha-v3" name="g-recaptcha-response" :data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']" />
              <div align="center">
                <span id="form-captcha-error" style="color:red"></span>
              </div>
            </div>
          </template>
        </div>
        <div v-if="$store.state.site.settings?.['registration:is-subscribe']" class="col_full check-control">
          <input id="checkbox-subscriber" class="checkbox-style" type="checkbox" checked value="1" v-model="credentials.is_subscriber">
          <label for="checkbox-subscriber" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['registration:subscribe-help']"></label>
        </div>
        <div v-if="$store.state.site.settings?.['general:is-terms-message-enabled']" class="col_full check-control">
          <input id="checkbox-terms" class="checkbox-style" type="checkbox" v-model="credentials.is_agree_with_terms">
          <label for="checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['registration:terms-message']"></label>
        </div>
        <button type="submit" class="button button-rounded button-reveal tright nomargin fright" id="register-form-submit">
          <i class="icon-line-check"></i><span>{{ $trans('auth.login_register_modal.register_tab.submit') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CaptchaVersionEnum from '@/enums/CaptchaVersionEnum';

export default {
  data: () => ({
    CaptchaVersionEnum,
    credentials: {
      firstname: null,
      surname: null,
      email: null,
      phone: null,
      password: null,
      password_confirmation: null,
      is_subscriber: null,
      is_agree_with_terms: null,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    async handleRegisterSubmit() {
      this.loading = true;
      let success, message;
      try {
        ({data: {success, message}} = await this.$axios.post('register/user', this.credentials));
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
      if (!success) {
        this.$noty(message, 'error');
        return;
      }
      this.$emit('success');
    },
  },
}
</script>
