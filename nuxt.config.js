import EventEmitter from 'events';
import webpack from 'webpack';

EventEmitter.defaultMaxListeners = 20;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ventumprint-site',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    bodyAttrs: {
      class: 'stretched no-transition',
      'data-loader': 12,
      'data-loader-color': '#59BA40',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'magnific-popup/dist/magnific-popup.css',
    'noty/src/noty.scss',
    '~/assets/css/noty-mint-theme.scss',
    //'sweetalert/dist/sweetalert.css',
    '~/assets/css/sweetalert.scss',
    '~/assets/css/bs-datatable.scss',
    //'datatables.net-responsive-dt/css/responsive.dataTables',
    '~/assets/css/bs-datatable-responsive.scss',
    'select2/dist/css/select2.css',
    'bootstrap-fileinput/css/fileinput.css',
    'bootstrap-star-rating/css/star-rating.css',
    'ion-rangeslider/css/ion.rangeSlider.css',
    'ion-rangeslider/css/ion.rangeSlider.skinNice.css',
    '~/assets/css/ionrangeslider.scss',
    '~/assets/css/google-fonts.scss',
    '~/assets/css/back-font-icons.scss',
    '~/assets/css/back-common.scss',
    '~/assets/css/main.scss',
    '~/assets/css/font-icons.scss',
    '~/assets/css/select-boxes.scss',
    '~/assets/css/creators.scss',
    '~/assets/css/common.scss',
    '~/assets/css/checkout.scss',
    '~/assets/css/messengers.scss',
    '~/assets/css/widgets.scss',
    '~/assets/css/blog.scss',
    '~/assets/css/product.scss',
    '~/assets/css/templates.scss',
    '~/assets/css/reviews.scss',
    '~/assets/css/search.scss',
    '~/assets/css/custom-styles.scss',
  ],

  hooks: {
    'vue-renderer': {
      ssr: {
        templateParams(templateParams, renderContext) {
          if (renderContext.nuxt.state.site.settings?.favicon_html) {
            templateParams.HEAD += renderContext.nuxt.state.site.settings.favicon_html;
          }
          if (renderContext.nuxt.state.site.settings?.['seo-integration:js-to-head']) {
            templateParams.HEAD += renderContext.nuxt.state.site.settings['seo-integration:js-to-head'];
          }
          if (renderContext.nuxt.state.site.settings?.['seo-integration:js-to-body']) {
            templateParams.APP = renderContext.nuxt.state.site.settings['seo-integration:js-to-body'] + templateParams.APP;
          }
          if (renderContext.nuxt.state.site.settings?.['seo-integration:js-to-footer']) {
            templateParams.APP += renderContext.nuxt.state.site.settings['seo-integration:js-to-footer'];
          }
        },
      },
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios-params-serializer.js',
    '~/plugins/axios-cache.server.js',
    '~/plugins/axios-error.js',
    '~/plugins/axios-headers.js',
    '~/plugins/fragment',
    '~/plugins/page',
    '~/plugins/currency-format-service',
    '~/plugins/date-time-format-service',
    '~/plugins/download.client',
    '~/plugins/load-interacted.client',
    '~/plugins/images-loaded.client',
    '~/plugins/isotope.client',
    '~/plugins/nl2br',
    '~/plugins/trans',
    '~/plugins/bs.client',
    '~/plugins/mfp.client',
    '~/plugins/owl-carousel.client',
    '~/plugins/fitvids.client',
    '~/plugins/mask.client',
    '~/plugins/noty.client',
    '~/plugins/toastr.client',
    '~/plugins/confirm.client',
    '~/plugins/google-shopping.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['nuxt-storm', { nested: true, alias: true }],
    'nuxtjs-laravel-echo-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-route-meta',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@netsells/nuxt-auth',
    'vue-social-sharing/nuxt',
    '~/modules/axios-cache',
  ],

  // Proxy module configuration: https://github.com/nuxt-community/proxy-module#object-config
  proxy: {
    '/attachment': process.env.API_ORIGIN,
    '/storage': process.env.API_ORIGIN,
    '/socket.io': process.env.API_ORIGIN,
    '/favicons': process.env.API_URL,
    '/favicon.ico': process.env.API_URL + 'favicons',
    '/robots.txt': process.env.API_URL,
    '/sitemap.xml': process.env.API_URL,
    '/*/sitemap.xml': {
      target: process.env.API_URL,
      pathRewrite: {'^/.*/sitemap.xml' : '/sitemap.xml'},
      onProxyReq: (proxyReq, req, res) => proxyReq.setHeader('Accept-Language', req.originalUrl.match('^/(.*)/sitemap.xml')?.[1]),
    },
    '/google-shopping.xml': process.env.API_URL,
    '/*/google-shopping.xml': {
      target: process.env.API_URL,
      pathRewrite: {'^/.*/google-shopping.xml' : '/google-shopping.xml'},
      onProxyReq: (proxyReq, req, res) => proxyReq.setHeader('Accept-Language', req.originalUrl.match('^/(.*)/google-shopping.xml')?.[1]),
    },
    '/creator-dist/': process.env.API_ORIGIN,
    '/creators/lists/': process.env.API_ORIGIN,
    '/creators/twemoji/': process.env.API_ORIGIN,
  },

  echo: {
    broadcaster: 'socket.io',
    //host: process.env.API_ORIGIN,
    //auth: {headers: {'X-Echo-Showcase-Slug': process.env.API_SITE}},
    authModule: true,
    connectOnLogin: false,
    disconnectOnLogout: false,
    plugins: ['~/plugins/echo.client.js'],
    namespace: 'App.Events.Api.Site',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    baseURL: process.env.BASE_URL + '/api', // temporary value that will not be used, needs to be not empty for app build
  },

  auth: {
    authModule: '@nuxtjs/auth-next',
    strategies: {
      laravelJWT: {
        scheme: '~/modules/auth/scheme',
        provider: 'laravel/jwt',
        url: process.env.BASE_URL, // temporary value that will not be used, needs to be not empty for app build
        token: {
          property: 'access_token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
      },
    },
    cookie: {
      options: {
        //sameSite: 'lax',
        //sameSite: 'none',
        expires: 1,
      },
    },
    redirect: {
      login: '/',
      home: false,
    },
    vuex: {
      namespace: '$auth',
    },
  },

  publicRuntimeConfig: {
    echo: {
      host: process.env.API_ORIGIN,
      auth: {headers: {'X-Echo-Showcase-Slug': process.env.API_SITE}},
    },
    axios: {
      baseURL: process.env.API_URL,
    },
    auth: {
      strategies: {
        laravelJWT: {
          url: process.env.API_URL,
          endpoints: {
            login: {url: 'auth/login'},
            refresh: {url: 'auth/refresh'},
            logout: {url: 'auth/logout'},
            user: {url: 'auth/user'},
          },
        },
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|scss|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler'),
      },
    },
    parallel: true,
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
  },

  // Router property -  https://nuxtjs.org/docs/2.x/features/file-system-routing#the-router-property
  router: {
    extendRoutes: (routes, resolve) => {
      const removeLocaleFromRoutesNames = routes => {
        for (const route of routes) {
          if (route.name === 'locale') {
            route.name = 'index';
            route.path = '/:locale(\\w{2})?';
          }
          if (route.name?.startsWith('locale/')) {
            route.name = route.name.substr('locale/'.length);
          }
          if (route.children?.length) {
            removeLocaleFromRoutesNames(route.children);
          }
        }
      };
      removeLocaleFromRoutesNames(routes)
    },
    routeNameSplitter: '/',
    scrollBehavior: (to, from, savedPosition) => {
      document.activeElement?.blur();
      return !to.params.append && {x: 0, y: 0};
    },
    middleware: [
      //
    ],
  },

  serverMiddleware: [
    (req, res, next) => {
      if ((req.method === 'POST') &&
        /\/order-payment\/\d+\/result\/\d+/.test(req.url)
      ) {
        res.writeHead(301, {Location: req.url});
        res.end();
        return;
      }
      next();
    },
  ],
}
