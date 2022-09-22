<template>
  <div class="showcase-widget col-md-3 col-sm-4 col-xs-6  widget_links" data-widget="MainthemAddress" itemscope itemtype="https://schema.org/Organization">
    <div class="widget widget_links clearfix">
      <meta itemprop="name" :content="$store.state.site.settings?.['general:display-site-name']">
      <h4 v-if="title">{{ title }}</h4>
      <template v-if="subtitle"><strong>{{ subtitle }}</strong><br></template>
      <div itemscope itemprop="address" itemtype="http://schema.org/PostalAddress">
        <div v-if="address" itemprop="streetAddress" v-html="address?.replace(/(\\r)*\\n/g, '<br>')"></div>
        <div v-for="phone of phones">
          <strong v-if="phone.prefix" v-html="phone.prefix"></strong>
          <span itemprop="telephone"><a :href="'tel:' + phone.number"> {{ phone.number }}</a></span>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <a v-if="link_facebook" :href="link_facebook" class="social-icon si-facebook nobottommargin">
          <i class="backicon-facebook"></i>
          <i class="backicon-facebook"></i>
        </a>
        <a v-if="link_vk" :href="link_vk" class="social-icon si-vk nobottommargin">
          <i class="backicon-vk"></i>
          <i class="backicon-vk"></i>
        </a>
        <a v-if="link_twitter" :href="link_twitter" class="social-icon si-twitter nobottommargin">
          <i class="backicon-twitter"></i>
          <i class="backicon-twitter"></i>
        </a>
        <a v-if="link_google_plus" :href="link_google_plus" class="social-icon si-google nobottommargin">
          <i class="backicon-google-plus"></i>
          <i class="backicon-google-plus"></i>
        </a>
        <a v-if="link_instagram" :href="link_instagram" class="social-icon si-instagram nobottommargin">
          <i class="backicon-instagram2"></i>
          <i class="backicon-instagram2"></i>
        </a>
        <a v-if="link_youtube" :href="link_youtube" class="social-icon si-youtube nobottommargin">
          <i class="backicon-youtube"></i>
          <i class="backicon-youtube"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    subtitle: {type: String},
    address: {type: String},
    phones: {type: Array},
    link_facebook: {type: String},
    link_vk: {type: String},
    link_twitter: {type: String},
    link_google_plus: {type: String},
    link_instagram: {type: String},
    link_youtube: {type: String},
  },
}
</script>
