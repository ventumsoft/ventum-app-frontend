export default function ({$auth, $echo}) {
  $auth.$storage.watchState('user', async (user, oldUser) => {
    if ($echo.connector) {
      if (oldUser) {
        $echo.leave('Api.Site.User.' + oldUser.id);
      }
      await $echo.disconnect();
    }
    $echo.options.auth.headers = await $echo.getHeaders();
    $echo.connect();
  });
}
