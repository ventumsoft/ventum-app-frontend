<template>
  <fragment>
    <PageTitle
      :title="$trans('account.page-title')"
      :breadcrumbs="[
        {title: $trans('default.breadcrumbs.main'), url: $page({name: 'index'})},
        {title: $trans('account.page-title')},
      ]"
    />
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div class="postcontent nobottommargin clearfix fullwidth postcontent-account">
            <ul id="portfolio-filter" class="clearfix">
              <li
                v-for="tab of PersonalAccountTabEnum"
                v-if="(tab !== PersonalAccountTabEnum.CREATORS_TEMPLATES) && (tab !== PersonalAccountTabEnum.CREATORS_TEMPLATES_PAYMENTS) || $auth.user.isDesigner"
                :class="{activeFilter: $route.name === 'user/' + tab}"
              >
                <TheLink :to="$page({name: 'user/' + tab})" class="account-tab-toggler">
                  {{ $trans('account.tabs.' + tab) }}
                </TheLink>
              </li>
            </ul>
            <div class="clear"></div>
            <div id="client-account" class="client-account account-tab-content">
              <div v-if="false" class="account-tab-content-loader"><i class="icon-cog spinner"></i></div>
              <NuxtChild v-if="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import PersonalAccountTabEnum from '@/enums/PersonalAccountTabEnum';

export default {
  head() {
    return {
      title: this.$trans('account.page-meta-title'),
    };
  },
  middleware: [
    'authenticate',
    async function ({route, redirect, $page}) {
      if (route.name === 'user') {
        redirect($page({name: 'user/' + PersonalAccountTabEnum.ORDERS}));
        return;
      }
    },
  ],
  data: () => ({
    PersonalAccountTabEnum,
  }),
}
</script>
