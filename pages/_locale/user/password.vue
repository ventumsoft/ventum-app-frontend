<template>
  <div class="client-account-item account-password account-tab-password">
    <div class="nobottommargin clearfix" style="max-width: 550px;">
      <div class="acc_content clearfix">
        <form
          id="password-change"
          name="password-change"
          class="nobottommargin"
          @submit.prevent="submitPasswordChange"
        >
          <div v-if="loading" class="form-process"></div>
          <div class="col_full">
            <label for="register-form-password">{{ $trans('account.password.enternewpassword') }}:</label>
            <input
              type="password"
              id="register-form-password"
              class="form-control"
              :class="{error: errors?.password}"
              v-model="formData.password"
              required
            >
          </div>
          <div class="col_full">
            <label for="register-form-repassword">{{ $trans('account.password.repeatpassword') }}:</label>
            <input
              type="password"
              id="register-form-repassword"
              class="form-control"
              :class="{error: errors?.repeat_password}"
              v-model="formData.repeat_password"
              required
            >
          </div>
          <div class="col_full nobottommargin">
            <button
              class="export button button-rounded button-reveal tright nomargin fright"
              id="password-change-submit"
            >
              <i class="icon-save"></i><span>{{ $trans('account.password.save') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    formData: {
      password: null,
      repeat_password: null,
    },
    errors: null,
  }),
  methods: {
    async submitPasswordChange() {
      this.loading = true;
      this.errors = null;
      let success;
      try {
        ({data: {
          success,
        }} = await this.$axios.post('user/password', this.formData, {silenceException: true}));
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
      if (success) {
        this.$noty(this.$trans('account.profile.saved'));
      }
    },
  },
}
</script>
