<template>
  <div id="wrapper" class="clearfix">
    <CustomStyles />
    <div class="wrapper-content">
      <TopBar />
      <PageHeader />
      <Nuxt />
    </div>
    <PageFooter />
    <div id="gotoTop" class="icon-angle-up"></div>
    <AuthLoginModal />
    <AuthRecoveryModal />
    <PageMessengers />
    <SearchModal />
  </div>
</template>

<script>
import jRespond from 'jrespond/js/jRespond.min';

export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$store.state.page.language?.slug,
        class: 'flex-footer',
      },
      link: [
        !this.$store.state.site.settings?.favicon_link && !this.$store.state.site.settings?.favicon_html && {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        this.$store.state.site.settings?.favicon_link && {rel: 'shortcut icon', href: this.$store.state.site.settings.favicon_link},
      ].filter(v => v),
    };
  },
  mounted() {
    this.responsiveClasses();
    this.checkVisitingFromAdminToken();
  },
  watch: {
    $route() {
      setTimeout(() => {
        $('body').addClass({
          desktop: 'device-lg',
          laptop: 'device-md',
          tablet: 'device-sm',
          handheld: 'device-xs',
          smallest: 'device-xxs',
        }[this.$jRes.getBreakpoint()]);
      }, 10);
    },
  },
  methods: {
    responsiveClasses() {
      const $body = $('body');
      const jRes = jRespond([
        {label: 'smallest', enter: 0, exit: 479},
        {label: 'handheld', enter: 480, exit: 767},
        {label: 'tablet', enter: 768, exit: 991},
        {label: 'laptop', enter: 992, exit: 1199},
        {label: 'desktop', enter: 1200, exit: 10000},
      ]);
      jRes.addFunc([
        {
          breakpoint: 'desktop',
          enter: () => $body.addClass('device-lg'),
          exit: () => $body.removeClass('device-lg'),
        },{
          breakpoint: 'laptop',
          enter: () => $body.addClass('device-md'),
          exit: () => $body.removeClass('device-md'),
        },{
          breakpoint: 'tablet',
          enter: () => $body.addClass('device-sm'),
          exit: () => $body.removeClass('device-sm'),
        },{
          breakpoint: 'handheld',
          enter: () => $body.addClass('device-xs'),
          exit: () => $body.removeClass('device-xs'),
        },{
          breakpoint: 'smallest',
          enter: () => $body.addClass('device-xxs'),
          exit: () => $body.removeClass('device-xxs'),
        },
      ]);
      this.$jRes = jRes;
    },
    checkVisitingFromAdminToken() {
      if (this.$route.query?.visitingFromAdminToken) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('visitingFromAdminToken', this.$route.query.visitingFromAdminToken);
          this.$router.replace({
            ...this.$route,
            query: {
              ...this.$route.query,
              visitingFromAdminToken: undefined,
            },
          });
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  #top-bar, #primary-menu {
    li:hover {
      &>ul {
        display: block;
      }
    }
  }
  .__nuxt-error-page {
    position: relative;
  }
}
</style>

<style lang="scss">
body {
  &.device-sm, &.device-xs, &.device-xxs {
    #primary-menu ul li.sub-menu {
      &>a>i.icon-angle-down {
        display: none;
      }
    }
  }
  .rating-container {
    font-size: 36px;
    .star {
      margin: 0;
    }
    .filled-stars {
      color: #59BA40;
      text-shadow: none;
      -webkit-text-stroke: unset;
    }
  }
  .btn-file i {
    position: relative;
    top: 2px;
    & ~ span {
      margin-left: 2px;
    }
  }
  .btn-file.btn, .fileinput-upload.btn {
    padding-bottom: 5px;
  }
}
#__nuxt .nuxt-progress + #__layout {
  #top-bar, #primary-menu {
    li:hover {
      &>ul {
        display: none;
      }
    }
  }
}
html.flex-footer {
  #__nuxt, #__layout {
    height: 100%;
  }
}

.form-process {
  display: block;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
