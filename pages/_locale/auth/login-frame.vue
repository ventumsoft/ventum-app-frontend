<template>
  <div v-show="false"></div>
</template>

<script>
export default {
  layout: 'frame',
  mounted() {
    if (!(this.$route.query.restorePasswordEmail && this.$route.query.restorePasswordCode) &&
      !(this.$route.query.confirmUserId && this.$route.query.confirmUserCode) &&
      !this.$route.query.authUserOrGuest
    ) {
      this.$store.commit('auth/update', {isShowingLoginModal: true});
    }
    window.parent.postMessage('Auth.LoginFrame.Loaded', window.location.origin);
    this.$store.commit('auth/update', {loginFrameCallback: result => {
      window.parent.postMessage('Auth.LoginFrame.Result.' + JSON.stringify(result), window.location.origin);
    }});
    if (this.$route.query.authUserOrGuest) {
      this.$auth.getUserOrGuest().then(user => {
        this.$store.dispatch('auth/callLoginFrameCallbackIfExists', {success: this.$auth.loggedIn});
      });
    }
    let constructorLayoutSaveResolve;
    window.addEventListener('message', event => {
      if (window.location.origin !== event.origin) {
        return;
      }
      if (event.data === 'Auth.LoginFrame.Layout.Save.Require') {
        this.$store.commit('auth/update', {constructorLayoutSaveCallback: () => new Promise(resolve => {
          constructorLayoutSaveResolve = resolve;
          window.parent.postMessage('Auth.LoginFrame.Layout.Save.Request', window.location.origin);
        })});
        return;
      }
      if (event.data.startsWith('Auth.LoginFrame.Layout.Save.Result')) {
        const result = JSON.parse(event.data.substr('Auth.LoginFrame.Layout.Save.Result.'.length));
        constructorLayoutSaveResolve(result);
      }
    }, false);
  },
}
</script>
