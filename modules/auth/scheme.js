//import { LaravelJWTScheme } from '~auth/runtime';
import { LaravelJWTScheme } from '@nuxtjs/auth-next/dist/runtime';

export default class AuthScheme extends LaravelJWTScheme {
  async fetchUser (endpoint) {
    const redirectLogoutBackup = this.$auth.options.redirect.logout = false;
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
