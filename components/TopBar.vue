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
            <li v-if="$auth.user" class="hidden-xs hidden-sm">
              <a href="#">
                <i class="icon-user"></i>
                <span class="stat-new-messages-orders" style="position:absolute;top:5px;left:20px;font-size:10px;color:#FFF;width:14px;height:14px;line-height:15px;text-align:center;border-radius:50%;background-color:#59BA40;">
                  {{ $auth.user.statNewMessagesOrders }}
                </span>
                {{ $auth.user.name }}
              </a>
              <ul style="width: 190px;">
                <li>
                  <a href="#" @click.prevent="$auth.logout()">
                    <i class="icon-signout"></i>{{ $trans('header.logout') }}
                  </a>
                </li>
              </ul>
            </li>
            <li v-else class="hidden-xs hidden-sm">
              <a href="#" @click.prevent="$emit('login')">
                <i class="icon-signin"></i> {{ $trans('header.login') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
