<template>
  <BsModal
    id="loginRegisterModal"
    class="modaltop"
    @closed="$emit('closed')"
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
                    @success="close"
                  />
                  <AuthTabRecoveryPanel
                    v-if="isShowingRecoveryInsteadOfLogin"
                    @cancel="isShowingRecoveryInsteadOfLogin = false"
                    @success="close"
                  />
                </div>
                <div
                  v-if="!$store.state.site.settings?.['registration:disabled-registration']"
                  class="tab-content clearfix"
                  id="tab-register"
                >
                  <AuthTabRegisterPanel @success="close" />
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
export default {
  data: () => ({
    isShowingRecoveryInsteadOfLogin: false,
  }),
  methods: {
    close() {
      $(this.$el).modal('hide');
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
