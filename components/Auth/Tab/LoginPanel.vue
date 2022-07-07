<template>
  <div class="panel panel-default nobottommargin noborder">
    <div v-show="loading" class="form-process"></div>
    <div class="panel-body">
      <form id="login-form" name="login-form" class="nobottommargin" @submit.prevent="handleLoginSubmit">
        <div
          v-if="errors"
          class="errors alert alert-warning"
          style="margin: -15px -15px 15px -15px"
          v-html="errors.join('<br />')"
        ></div>
        <div class="col_full">
          <label for="login-form-username">{{ $trans('auth.login_register_modal.login_tab.form_email') }}</label>
          <input type="text" id="login-form-username" name="email" value="" class="form-control" required v-model="credentials.email" />
        </div>
        <div class="col_full">
          <label for="login-form-password">{{ $trans('auth.login_register_modal.login_tab.form_password') }}</label>
          <input type="password" id="login-form-password" name="password" value="" class="form-control" required v-model="credentials.password" />
        </div>
        <div class="col_full nobottommargin">
          <a id="forgot_password" href="#" @click.prevent="$emit('recovery')">
            {{ $trans('auth.login_register_modal.login_tab.forgot_password') }}
          </a>
          <div>
            <input id="checkbox-3" class="checkbox-style" name="remember" checked="checked" type="checkbox">
            <label for="checkbox-3" class="checkbox-style-2-label checkbox-small">{{ $trans('auth.login_register_modal.login_tab.remember_me') }}</label>
          </div>
        </div>
        <button type="submit" class="button button-rounded button-reveal tright nomargin fright" id="login-form-submit">
          <i class="icon-enter"></i><span>{{ $trans('auth.login_register_modal.login_tab.form_submit') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    credentials: {
      email: null,
      password: null,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    async handleLoginSubmit() {
      this.loading = true;
      try {
        await this.$auth.login({data: this.credentials, silenceException: true});
      } catch (exception) {
        this.errors = ('object' === typeof exception.response?.data?.errors) && Object.values(exception.response.data.errors) ||
          exception.response?.data?.message && [exception.response.data.message] ||
          [exception.message];
        return;
      } finally {
        this.loading = false;
      }
      this.$emit('success');
    },
  },
}
</script>
