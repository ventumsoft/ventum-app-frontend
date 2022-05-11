<template>
  <header id="header" class="without-bottom-border">
    <div ref="headerWrap" id="header-wrap">
      <div class="container clearfix">
        <div id="primary-menu-trigger" @click="togglePrimaryMenu"><i class="icon-reorder"></i></div>
        <ContentWidgetsOnPage type="header" location="top" name="Logo" />
        <nav id="primary-menu">
          <ul class="clearfix">
            <li class="hidden-md hidden-lg">
              <a href="#">
                <template v-if="false">user</template>
                <template v-else><i class="icon-signin"></i> {{ $trans('header.login') }}</template>
              </a>
            </li>
            <ContentWidgetsOnPage type="header" location="top" name="SitesList" class="hidden-md hidden-lg" />
            <LanguagesMenu class="hidden-md hidden-lg" />
            <ContentWidgetsOnPage type="header" location="top" name="Phones" />
            <ContentWidgetsOnPage type="header" location="middle" />
          </ul>
          <ShoppingCart />
          <div v-if="true || true" id="top-search">
            <a v-if="true" href="tel:phone_sm" class="hidden-sm hidden-md hidden-lg phone">
              <i class="icon-phone3"></i>
              <i class="icon-line-cross"></i>
            </a>
            <template v-if="true">
              <a href="#" id="top-search-trigger" @click.prevent>
                <i class="icon-search3"></i>
                <i class="icon-line-cross"></i>
              </a>
              <form class="header-search-form">
                <input
                  type="text"
                  class="form-control hidden-xs search-form-input"
                  value=""
                  :placeholder="$trans('header.search_placeholder')"
                >
                <input
                  type="text"
                  class="form-control hidden-sm hidden-md hidden-lg search-form-input"
                  value=""
                  :placeholder="$trans('header.search_placeholder_short')"
                >
                <button type="submit" class="hidden"></button>
              </form>
            </template>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['widgets']),
  },
  mounted() {
    ['load', 'scroll'].forEach(eventType => window.addEventListener(eventType, event => {
      this.stickyMenu();
    }))
  },
  methods: {
    stickyMenu() {
      if (window.scrollY > this.$refs.headerWrap.offsetTop) {
        if (document.body.classList.contains('device-lg') || document.body.classList.contains('device-md') ) {
          document.querySelector('body:not(.side-header) #header:not(.no-sticky)')?.classList?.add('sticky-header');
          if (!this.$refs.headerWrap.classList.contains('force-not-dark') ) {
            this.$refs.headerWrap.classList.remove('not-dark');
          }
          //SEMICOLON.header.stickyMenuClass();
        } else if(document.body.classList.contains('device-xs') || document.body.classList.contains('device-xxs') || document.body.classList.contains('device-sm') ) {
          if (document.body.classList.contains('sticky-responsive-menu')) {
            document.querySelector('#header:not(.no-sticky)')?.classList?.add('responsive-sticky-header');
            //SEMICOLON.header.stickyMenuClass();
          }
        }
      } else {
        this.removeStickyness();
      }
    },
    removeStickyness() {
      if (this.$el.classList.contains('sticky-header') ){
        document.querySelector('body:not(.side-header) #header:not(.no-sticky)')?.classList?.remove('sticky-header');
        if(!this.$refs.headerWrap.classList.contains('force-not-dark') ) {
          this.$refs.headerWrap.classList.remove('not-dark');
        }
        //SEMICOLON.slider.swiperSliderMenu();
        //SEMICOLON.slider.revolutionSliderMenu();
      }
      if (this.$el.classList.contains('responsive-sticky-header') ){
        document.querySelector('body.sticky-responsive-menu #header')?.classList?.remove('responsive-sticky-header');
      }
      if ((document.body.classList.contains('device-xs') || document.body.classList.contains('device-xxs') || document.body.classList.contains('device-sm')) && (typeof responsiveMenuClasses === 'undefined')) {
        if (!this.$refs.headerWrap.classList.contains('force-not-dark') ) {
          this.$refs.headerWrap.classList.remove('not-dark');
        }
      }
    },
    togglePrimaryMenu() {
      $('#primary-menu > ul, #primary-menu > div > ul').toggleClass('show');
    },
  },
}
</script>
