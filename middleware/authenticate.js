import { authMiddleware as baseAuthMiddleware } from '@nuxtjs/auth-next/dist/runtime';

export default function (context) {
  if (process.client) {
    if (!context.$auth.loggedIn) {
      //context.next(false);
      context.redirect(context.from);
      context.store.commit('site/setShowingLoginModal', true);
      return;
    }
  }
  baseAuthMiddleware(context);
}
