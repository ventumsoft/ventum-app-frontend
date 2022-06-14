<template>
  <div class="panel panel-default nobottommargin noborder">
    <div v-show="loading" class="form-process" style="display: block;"></div>
    <div class="panel-body" id="password-recovery-container">
      <form class="account-recovery-form" @submit.prevent="handleRecoverySubmit">
        <div class="alert alert-info">
          {{ $trans('auth.recovery.password.message.info.get.link') }}
        </div>
        <div class="form-group">
          <label for="recovery-email">{{ $trans('auth.recovery.password.label.email') }}</label>
          <div class="col_full">
            <input id="recovery-email" name="email" class="form-control" v-model="email" required>
            <label v-if="error" id="email-error" class="recovery-message-error" v-html="error"></label>
          </div>
        </div>
        <div class="col_full nobottommargin">
          <button
            id="cancel-password-recovery"
            class="button button-rounded button-reveal button-white button-light tright nomargin fleft"
            @click="$emit('cancel')"
          >
            <i class="icon-line-cross"></i>
            <span>{{ $trans('auth.recovery.password.button.cancel') }}</span>
          </button>
          <button type="submit" class="button button-rounded button-reveal tright nomargin fright">
            <i class="icon-line-check"></i>
            <span>{{ $trans('auth.recovery.password.button.recovery') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    loading: false,
    error: null,
  }),
  methods: {
    async handleRecoverySubmit() {
      this.loading = true;
      let success, message;
      try {
        ({data: {
          success,
          message,
        }} = await this.$axios.post('recovery/request', {
          locale: this.$store.state.site.language.slug,
          email: this.email,
        }));
      } catch (exception) {
        this.error = exception.response?.data?.errors?.email?.[0] || exception.response?.data?.message || exception.message;
        return;
      } finally {
        this.loading = false;
      }
      if (!success) {
        this.error = message;
        return;
      }
      this.$noty(message);
      this.$emit('success');
    },
  },
}
</script>
