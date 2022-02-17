<template>
  <header id="header" class="without-bottom-border">
    <div id="header-wrap">
      <div class="container clearfix">
        <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>
        <ContentWidgetsOnPage type="header" location="top" name="MainthemLogo" />
        <nav id="primary-menu">
          <ul class="clearfix">
            <li class="hidden-md hidden-lg">
              <a href="#">
                <template v-if="false">user</template>
                <template v-else><i class="icon-signin"></i> site/header.login</template>
              </a>
            </li>
            <ContentWidgetsOnPage type="header" location="top" name="MainthemSitesList" class="hidden-md hidden-lg" />
            <LanguagesMenu class="hidden-md hidden-lg" />
            <ContentWidgetsOnPage type="header" location="top" name="MainthemPhones" />
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
                  placeholder="site/header.search_placeholder'"
                >
                <input
                  type="text"
                  class="form-control hidden-sm hidden-md hidden-lg search-form-input"
                  value=""
                  placeholder="site/header.search_placeholder_short"
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
}
</script>
