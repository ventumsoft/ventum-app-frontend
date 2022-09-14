<template>
  <BsModal
    v-if="$store.state.auth.isShowingLoginModal"
    id="loginRegisterModal"
    class="modaltop fade"
    @closed="$store.commit('auth/update', {isShowingLoginModal: false}); $store.dispatch('auth/callLoginFrameCallbackIfExists', {success: false});"
  >
    <div class="modal-dialog">
      <div class="modal-body">
        <div class="modal-content">
          <div class="modal-header noborder">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <JqTabs id="tab-login-register" class="divcenter">
              <h4 v-if="$store.state.site.settings?.['registration:disabled-registration']" class="text-center">
                {{ $trans('auth.login_register_modal.login_tab_title') }}
              </h4>
              <ul v-else class="tab-nav tab-nav2 center clearfix">
                <li class="inline-block">
                  <a href="#tab-login">
                    {{ $trans('auth.login_register_modal.login_tab_title') }}
                  </a>
                </li>
                <li class="inline-block">
                  <a href="#tab-register">
                    {{ $trans('auth.login_register_modal.register_tab_title') }}
                  </a>
                </li>
              </ul>
              <div class="tab-container">
                <div class="tab-content clearfix" id="tab-login">
                  <AuthTabLoginPanel
                    v-if="!isShowingRecoveryInsteadOfLogin"
                    @recovery="isShowingRecoveryInsteadOfLogin = true"
                    @result="handleResult"
                  />
                  <AuthTabRecoveryPanel
                    v-if="isShowingRecoveryInsteadOfLogin"
                    @cancel="isShowingRecoveryInsteadOfLogin = false"
                    @result="handleResult"
                  />
                </div>
                <div
                  v-if="!$store.state.site.settings?.['registration:disabled-registration']"
                  class="tab-content clearfix"
                  id="tab-register"
                >
                  <AuthTabRegisterPanel @result="handleResult" />
                </div>
              </div>
            </JqTabs>
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
    isShowingRecoveryInsteadOfLogin: false,
  }),
  async mounted() {
    await this.confirmUserIfNeeded();
  },
  methods: {
    async confirmUserIfNeeded() {
      const {confirmUserId: userId, confirmUserCode: code} = this.$route.query;
      if (userId && code) {
        if (this.$auth.loggedIn) {
          if (this.$auth.user.id == userId) {
            return this.$router.push({name: 'user/profile'});
          } else {
            await this.$auth.logout();
          }
        }
        let success, message, token;
        try {
          ({data: {
            success,
            message,
            token,
          }} = await this.$axios.post('register/confirm', {
            userId,
            code,
          }));
        } catch (exception) {
          success = false;
          message = exception.response?.data?.message || exception.message;
        }
        if (success && token) {
          await this.$auth.login({data: token});
        }
        this.handleResult({success, message});
      }
      let query = querystring.parse(window.location.search.substr(1));
      delete query.confirmUserId;
      delete query.confirmUserCode;
      query = querystring.stringify(query);
      history.replaceState(null, null, window.location.pathname + (query ? ('?' + query) : ''));
    },
    handleResult({success, message}) {
      this.$store.dispatch('auth/callLoginFrameCallbackIfExists', {success, message});
      if (message) {
        this.$noty(message, success ? 'alert' : 'error');
      }
      if (this.$store.state.auth.isShowingLoginModal) {
        $(this.$el).modal('hide');
      }
    },
  },
}
</script>

<style lang="scss">
#loginRegisterModal {
  #tab-login-register {
    max-width: 500px;
    margin-bottom: 0px;
  }

  .panel {
    box-shadow: none;
  }

  .tab-container {
    padding: 10px 0 0;
  }
}
</style>
