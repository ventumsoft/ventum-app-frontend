<template>
  <div id="top-bar" class="hidden-xs">
    <div class="container clearfix">
      <ContentWidgets type="header" location="top" name="Phones" />
      <ContentWidgets type="header" location="top" name="HeaderCustomHtml" />
      <div class="col_half col_last nobottommargin">
        <div class="fright top-links">
          <ul class="clearfix">
            <ContentWidgets type="header" location="top" name="SitesList" class="hidden-xs hidden-sm" />
            <LanguagesMenu class="hidden-xs hidden-sm" />
            <LoginMenuItems class="hidden-xs hidden-sm" :subMenuWidth="190" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
