import webpack from 'webpack';

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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '~/assets/css/common.scss',
    '~/assets/css/widgets.scss',
    '~/assets/css/blog.scss',
    '~/assets/css/product.scss',
    '~/assets/css/templates.scss',
    '~/assets/css/reviews.scss',
    '~/assets/css/custom-styles.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios-cache.server.js',
    '~/plugins/fragment',
    '~/plugins/page',
    '~/plugins/images-loaded.client',
    '~/plugins/isotope.client',
    '~/plugins/nl2br',
    '~/plugins/trans',
    '~/plugins/bs.client',
    '~/plugins/fitvids.client',
    '~/plugins/noty.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['nuxt-storm', { nested: true, alias: true }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-social-sharing/nuxt',
    '~/modules/axios-cache',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    baseURL: process.env.API_URL,
  },

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: process.env.API_URL,
        endpoints: {
          login: {url: 'auth/login'},
          refresh: {url: 'auth/refresh'},
          logout: {url: 'auth/logout'},
          user: {url: 'auth/user'},
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
      },
    },
    redirect: {
      login: '/',
      home: false,
    },
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
}
