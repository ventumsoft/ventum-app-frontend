<template>
  <div id="top-bar" class="hidden-xs">
    <div class="container clearfix">
      <ContentWidgetsOnPage type="header" location="top" name="MainthemPhones" />
      <ContentWidgetsOnPage type="header" location="top" name="MainthemHeaderCustomHtml" />
    </div>
    <div class="col_half col_last nobottommargin">
      <div class="fright top-links">
        <ul>
          <ContentWidgetsOnPage type="header" location="top" name="MainthemSitesList" />
          <LanguagesMenu />
          <li class="hidden-xs hidden-sm">
            <a href="#">
              <template v-if="false">user</template>
              <template v-else><i class="icon-signin"></i> site/header.login</template>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
