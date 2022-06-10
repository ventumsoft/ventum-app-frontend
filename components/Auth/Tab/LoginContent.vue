<template>
  <div class="tab-content clearfix" id="tab-login">
    <div class="panel panel-default nobottommargin noborder">
      <div class="panel-body">
        <form id="login-form" name="login-form" class="nobottommargin" @submit.prevent="handleLoginSubmit">
          <div class="errors alert alert-warning hidden" style="margin: -15px -15px 15px -15px"></div>
          <div class="col_full">
            <label for="login-form-username">{{ $trans('auth.login_register_modal.login_tab.form_email') }}</label>
            <input type="text" id="login-form-username" name="email" value="" class="form-control" required v-model="credentials.email" />
          </div>
          <div class="col_full">
            <label for="login-form-password">{{ $trans('auth.login_register_modal.login_tab.form_password') }}</label>
            <input type="password" id="login-form-password" name="password" value="" class="form-control" required v-model="credentials.password" />
          </div>
          <div class="col_full nobottommargin">
            <a id="forgot_password" href="#" @click.prevent>
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
  </div>
</template>

<script>
export default {
  data: () => ({
    credentials: {
      email: null,
      password: null,
    },
  }),
  methods: {
    handleLoginSubmit() {
      this.$auth.login({data: this.credentials});
    },
  },
}
</script>
