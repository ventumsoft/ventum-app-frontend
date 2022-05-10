<template>
  <div id="top-bar" class="hidden-xs">
    <div class="container clearfix">
      <ContentWidgetsOnPage type="header" location="top" name="Phones" />
      <ContentWidgetsOnPage type="header" location="top" name="HeaderCustomHtml" />
      <div class="col_half col_last nobottommargin">
        <div class="fright top-links">
          <ul class="clearfix">
            <ContentWidgetsOnPage type="header" location="top" name="SitesList" class="hidden-xs hidden-sm" />
            <LanguagesMenu class="hidden-xs hidden-sm" />
            <li class="hidden-xs hidden-sm">
              <a href="#">
                <template v-if="false">user</template>
                <template v-else><i class="icon-signin"></i> {{ $trans('header.login') }}</template>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
