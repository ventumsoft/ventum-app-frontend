<template>
  <BsModal
    v-if="email && code"
    id="RestorePasswordModal"
    class="modaltop"
    @closed="$emit('closed')"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-show="loading" class="form-process" style="display: block;"></div>
        <div class="modal-header noborder">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">
          <form v-if="check" class="change-password-form" @submit.prevent="handleRecoverySubmit">
            <div class="row">
              <div class="col-md-offset-3 col-md-6">
                <div class="alert alert-info">
                  {{ $trans('auth.recovery.password.message.info.enter_password') }}
                </div>
                <div class="form-group" :class="{'has-error': errors?.password}">
                  <label>
                    {{ $trans('auth.recovery.password.label.password') }}
                  </label>
                  <div class="col_full">
                    <input type="password" class="form-control" required v-model="password">
                    <label
                      v-if="errors?.password"
                      class="recovery-message-error"
                      v-html="errors.password?.join('<br />') || errors.password"
                    ></label>
                  </div>
                </div>
                <div class="form-group" :class="{'has-error': errors?.password_confirmation}">
                  <label>
                    {{ $trans('auth.recovery.password.label.password_confirmation') }}
                  </label>
                  <div class="col_full">
                    <input type="password" class="form-control" required v-model="password_confirmation">
                    <label
                      v-if="errors?.password_confirmation"
                      class="recovery-message-error"
                      v-html="errors.password_confirmation?.join('<br />') || errors.password_confirmation"
                    ></label>
                  </div>
                </div>
                <div class="col_full nobottommargin">
                  <button type="submit" class="button button-rounded button-reveal tright nomargin fright">
                    <i class="icon-line-check"></i><span>{{ $trans('auth.recovery.password.button.continue') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div v-else class="alert alert-info">
            {{ $trans('auth.recovery.password.message.link_not_valid')}}
          </div>
        </div>
      </div>
    </div>
  </BsModal>
</template>

<script>
import querystring from 'querystring';

export default {
  data: () => ({
    email: null,
    code: null,
    check: null,
    password: null,
    password_confirmation: null,
    loading: false,
    errors: null,
  }),
  async mounted() {
    const {restorePasswordEmail: email, restorePasswordCode: code} = this.$route.query;
    if (email && code) {
      if (this.$auth.user && !this.$auth.user.isTemporary) {
        if (this.$auth.user.email === email) {
          return this.$router.push({name: 'user/profile'});
        } else {
          await this.$auth.logout();
        }
      }
      let check;
      try {
        ({data: {result: check}} = await this.$axios.post('recovery/check', {
          email,
          code,
        }));
      } catch (exception) {
        this.$noty(exception.response?.data?.message || exception.message, 'error');
      }
      this.email = email;
      this.code = code;
      this.check = check;
    }
    let query = querystring.parse(window.location.search.substr(1));
    delete query.restorePasswordEmail;
    delete query.restorePasswordCode;
    query = querystring.stringify(query);
    history.replaceState(null, null, window.location.pathname + (query ? ('?' + query) : ''));
  },
  methods: {
    async handleRecoverySubmit() {
      this.loading = true;
      let success, message, token;
      try {
        ({data: {
          success,
          message,
          token,
        }} = await this.$axios.post('recovery/password', {
          email: this.email,
          code: this.code,
          password: this.password,
          password_confirmation: this.password_confirmation,
        }));
      } catch (exception) {
        this.errors = ('object' === typeof exception.response?.data?.errors) && exception.response.data.errors ||
          exception.response?.data?.message && [exception.response.data.message] ||
          [exception.message];
        return;
      } finally {
        this.loading = false;
      }
      if (!success) {
        this.$noty(message, 'error');
        return;
      }
      this.$auth.login({data: token});
      $(this.$el).modal('hide');
    },
  },
}
</script>
