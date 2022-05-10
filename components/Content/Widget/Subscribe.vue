<template>
  <div class="showcase-widget section last-no-margin" data-widget="MainthemSubscribe">
    <div class="container clearfix">
      <div class="heading-block center">
        <h3 v-html="title"></h3>
        <span v-html="subtitle"></span>
      </div>
      <div id="widget-subscribe-form2-result" data-notify-type="success" data-notify-msg=""></div>
      <form id="widget-subscribe-form2" role="form" class="nobottommargin" @submit.prevent>
        <div class="divcenter" style="max-width:600px;">
          <div class="input-group input-group-lg">
            <span class="input-group-addon"><i class="icon-email3"></i></span>
            <input type="email" name="widget-subscribe-form-email" class="form-control required email" :placeholder="$trans('widgets.subscribe.input_email')">
            <span class="input-group-btn">
              <button class="btn btn-success" type="submit">{{ $trans('widgets.subscribe.btn') }}</button>
            </span>
          </div>
          <label class="widget-subscribe-form-email-error hidden"></label>
        </div>
      </form>
    </div>
    <div class="modal fade" id="modal-subscribe-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header nobottomborder nobottompadding clearfix">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <div class="modal-body">
            <div class="panel panel-default nobottommargin noborder">
              <div class="panel-body notoppadding">
                <div class="subscribe-form-result" data-notify-type="success" :data-notify-msg="'<i class=icon-ok-sign></i>' + $trans('widgets.subscribe.success')"></div>
                <form
                  class="subscribe-form nobottommargin"
                  data-result-target=".subscribe-form-result"
                  @submit.prevent
                >
                  <input type="hidden" name="_token">
                  <input type="hidden" name="email">
                  <div class="col_full">
                    <label>{{ $trans('widgets.subscribe.modal_name') }}</label>
                    <input type="text" class="form-control" name="name" required aria-required="true">
                  </div>
                  <div class="col_full">
                    <label>{{ $trans('widgets.subscribe.modal_surname') }}</label>
                    <input type="text" class="form-control" name="surname" required aria-required="true">
                  </div>
                  <div v-if="$store.state.site.settings?.['general:is-terms-message-enabled']" class="input-group check-control" style="margin-top: 20px;">
                    <input hidden name="is-terms-message-enabled" value="">
                    <input id="subscribe-checkbox-terms" class="checkbox-style required" type="checkbox" name="is-terms-message-enabled" required>
                    <label for="subscribe-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="terms_message"></label>
                  </div>
                  <template v-if="is_captcha_enabled">
                    <div v-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === 'recaptcha-v2'" class="col_full">
                      <div align="center" class="g-recaptcha" :data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']"></div>
                      <div id="form-captcha-error" style="color: red;"></div>
                    </div>
                    <div v-else-if="$store.state.site.settings?.['seo-integration:google-captcha-version'] === 'recaptcha-v3'" class="col_full" style="display: none;">
                      <input type="hidden" class="g-recaptcha-v3" name="g-recaptcha-response" :data-sitekey="$store.state.site.settings?.['seo-integration:use-google-captcha-key']" />
                      <div id="form-captcha-error" style="color: red;"></div>
                    </div>
                  </template>
                  <button
                    type="submit"
                    class="button button-rounded nomargin fright"
                    value="submit"
                    :data-loading-text="$trans('chat.sending')"
                  >
                    <span>{{ $trans('widgets.subscribe.btn') }}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    subtitle: {type: String},
    terms_message: {type: String},
    is_captcha_enabled: {type: Boolean},
  },
}
</script>
