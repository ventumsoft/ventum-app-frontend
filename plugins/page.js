export default ({app: {router}, store}, inject) => {
  inject('page', route => {
    const $route = router.options.routes.find(iteratedRoute => route.name === iteratedRoute.name);
    route.params = route.params || {};
    if ($route?.path?.includes?.('/:locale') && !route.params.locale) {
      route.params.locale = store.state.site.language?.slug;
    }
    return route;
  });
}
