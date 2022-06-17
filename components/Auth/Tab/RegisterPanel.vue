<template>
  <div class="panel panel-default nobottommargin noborder">
    <div v-show="loading" class="form-process" style="display: block;"></div>
    <div class="panel-body">
      <form id="register-form" name="register-form" class="nobottommargin" @submit.prevent="handleRegisterSubmit">
        <div v-if="$store.state.site.settings?.['registration:use-name-surname-enabled']" class="row">
          <div class="col-md-6">
            <div class="col_full">
              <label for="register-form-name">
                {{ $trans('auth.login_register_modal.register_tab.name') }}
              </label>
              <input type="text" id="register-form-name" value="" class="form-control" v-model="credentials.firstname" />
              <label v-if="errors?.firstname" id="registration-register-form-name-error" class="registration-message-error" v-html="errors.firstname?.join('<br/>') || errors.firstname"></label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col_full">
              <label for="register-form-surname">
                {{ $trans('auth.login_register_modal.register_tab.surname') }}
              </label>
              <input type="text" id="register-form-surname" value="" class="form-control" v-model="credentials.surname" />
              <label v-if="errors?.surname" id="registration-register-form-surname-error" class="registration-message-error" v-html="errors.surname?.join('<br/>') || errors.surname"></label>
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
              <label v-if="errors?.password" id="registration-password-error" class="registration-message-error" v-html="errors.password?.join('<br/>') || errors.password"></label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col_full">
              <label for="password_confirmation">
                {{ $trans('auth.login_register_modal.register_tab.repassword') }}
              </label>
              <input type="password" class="form-control" id="password_confirmation" v-model="credentials.password_confirmation" />
              <label v-if="errors?.password_confirmation" id="registration-password_confirmation-error" class="registration-message-error" v-html="errors.password_confirmation?.join('<br/>') || errors.password_confirmation"></label>
            </div>
          </div>
          <TheCaptcha
            ref="captcha"
            v-if="$store.state.site.settings?.['registration:use-google-captcha-enabled']"
            v-model="credentials.g_recaptcha_response"
            :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
          />
        </div>
        <div
          v-if="$store.state.site.settings?.['registration:is-subscribe']"
          class="col_full check-control"
          :class="{error: errors?.is_subscriber}"
        >
          <input id="checkbox-subscriber" class="checkbox-style" type="checkbox" checked value="1" v-model="credentials.is_subscriber">
          <label for="checkbox-subscriber" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['registration:subscribe-help']"></label>
        </div>
        <div
          v-if="$store.state.site.settings?.['general:is-terms-message-enabled']"
          class="col_full check-control"
          :class="{error: errors?.is_agree_with_terms}"
        >
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
      firstname: undefined,
      surname: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
      password_confirmation: undefined,
      is_subscriber: undefined,
      is_agree_with_terms: undefined,
      g_recaptcha_response: undefined,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    async handleRegisterSubmit() {
      this.loading = true;
      this.errors = null;
      let success, confirmed, message, token;
      try {
        ({data: {
          success,
          confirmed,
          message,
          token,
        }} = await this.$axios.post('register/user', this.credentials, {silenceException: true}));
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        return;
      } finally {
        this.loading = false;
        this.$refs.captcha?.resetRepatcha();
      }
      if (!success) {
        this.$noty(message, 'error');
        return;
      }
      if (message) {
        this.$noty(message);
      }
      if (confirmed && token) {
        this.$auth.login({data: token});
      }
      this.$emit('success');
    },
  },
}
</script>
