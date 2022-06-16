import { LaravelJWTScheme } from '@nuxtjs/auth-next/dist/runtime';

export default class AuthScheme extends LaravelJWTScheme {
  constructor($auth, options) {
    super($auth, options);
    $auth.getUserOrGuest = async () => {
      if (!$auth.user) {
        await $auth.login({data: {temporary: true}});
      }
      return $auth.user;
    }
  }

  async fetchUser (endpoint) {
    const redirectLogoutBackup = this.$auth.options.redirect.logout;
    this.$auth.options.redirect.logout = false;

    await super.fetchUser(endpoint);
    if (this.$auth.user?.isTemporary) {
      this.$auth.$storage.setState('loggedIn', false);
    }

    setTimeout(() => {
      this.$auth.options.redirect.logout = redirectLogoutBackup;
    }, 0);
  }
}
