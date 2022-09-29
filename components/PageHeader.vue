<template>
  <header id="header" class="without-bottom-border">
    <div ref="headerWrap" id="header-wrap">
      <div class="container clearfix">
        <div id="primary-menu-trigger" @click="togglePrimaryMenu"><i class="icon-reorder"></i></div>
        <ContentWidgets type="header" location="top" name="Logo" />
        <nav id="primary-menu">
          <ul class="clearfix">
            <LoginMenuItems class="hidden-md hidden-lg" :subMenuClass="true" />
            <ContentWidgets type="header" location="top" name="SitesList" class="hidden-md hidden-lg" />
            <LanguagesMenu class="hidden-md hidden-lg" />
            <ContentWidgets type="header" location="top" name="Phones" />
            <ContentWidgets type="header" location="middle" />
          </ul>
          <ShoppingCart />
          <div v-if="contactsPhoneXs || $store.state.site.settings?.['general:search:enabled']" id="top-search">
            <a v-if="contactsPhoneXs" class="hidden-sm hidden-md hidden-lg phone" :href="'tel:' + contactsPhoneXs">
              <i class="icon-phone3"></i>
              <i class="icon-line-cross"></i>
            </a>
            <template v-if="$store.state.site.settings?.['general:search:enabled']">
              <a href="#" id="top-search-trigger" @click.prevent="toggleSearch()">
                <i class="icon-search3"></i>
                <i class="icon-line-cross"></i>
              </a>
              <form class="header-search-form" @submit.prevent="openSiteSearchModal">
                <input
                  type="text"
                  class="form-control hidden-xs search-form-input"
                  :placeholder="$trans('header.search_placeholder')"
                  :value="$store.state.search.query"
                  @input="openSiteSearchModal"
                >
                <input
                  type="text"
                  class="form-control hidden-sm hidden-md hidden-lg search-form-input"
                  :placeholder="$trans('header.search_placeholder_short')"
                  :value="$store.state.search.query"
                  @input="openSiteSearchModal"
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
    contactsPhoneXs() {
      const number = this.$store.state.site.settings?.['general:contacts-phone-number-sm'];
      const result =
        (number == 1) && this.$store.state.site.settings?.['general:contacts-phone-one-number'] ||
        (number == 2) && this.$store.state.site.settings?.['general:contacts-phone-two-number'] ||
        (number == 3) && this.$store.state.site.settings?.['general:contacts-phone-three-number'];
      return result;
    },
  },
  mounted() {
    ['load', 'scroll'].forEach(eventType => window.addEventListener(eventType, event => {
      this.stickyMenu();
    }));
    document.addEventListener('click', this.handleDocumentClick);
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
    toggleSearch(value) {
      document.body.classList.toggle('top-search-open', value);
      //$('#primary-menu > ul, #primary-menu > div > ul').toggleClass('show', false);
      //$pagemenu.toggleClass('pagemenu-active', false);
      if (document.body.classList.contains('top-search-open')) {
        this.$el.querySelector('.search-form-input')?.focus();
      }
    },
    openSiteSearchModal(event) {
      this.$store.commit('search/update', {
        showing: true,
        query: event?.target?.value || '',
      });
      this.toggleSearch(false);
    },
    handleDocumentClick(event) {
      if (!event.target.closest('#top-search')) {
        this.toggleSearch(false);
      }
      //if (!$(event.target).closest('#page-menu').length) { $pagemenu.toggleClass('pagemenu-active', false); }
      //if (!$(event.target).closest('#side-panel').length) { $body.toggleClass('side-panel-open', false); }
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
}
</script>
