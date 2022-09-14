export default ({app: {router}, store, route: currentRoute}, inject) => {
  inject('page', route => {
    const isUsingLocaleParameter = Boolean(router.options.routes.find(iteratedRoute =>
      iteratedRoute.path?.includes?.('/:locale') &&
      ((iteratedRoute.name === route.name) || findChildrenRouteByName(iteratedRoute, route.name))
    ));
    if (isUsingLocaleParameter && !route.params?.locale) {
      route.params = route.params || {};
      route.params.locale = store.state.site.language?.slug;
      //route.params.locale = currentRoute?.params?.locale;
    }
    return route;
  });
}

function findChildrenRouteByName(parentRoute, findingName) {
  return parentRoute.children?.find(childrenRoute =>
    (childrenRoute.name === findingName) ||
    findChildrenRouteByName(childrenRoute, findingName)
  );
}
