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
    };
  },
  mounted() {
    this.responsiveClasses();
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
</style>
