<template>
  <div
    v-if="enabled"
    v-show="(version === CaptchaVersionEnum.RECAPTCHA_V2) || error"
    class="col_full"
    :class="{'has-error': error}"
  >
    <div
      ref="recaptchaContainer"
      v-if="version === CaptchaVersionEnum.RECAPTCHA_V2"
      align="center"
    ></div>
    <div v-if="error" align="center">
      <span id="form-captcha-error" style="color: red;" v-html="error"></span>
    </div>
  </div>
</template>

<script>
import CaptchaVersionEnum from '@/enums/CaptchaVersionEnum';

export default {
  props: [
    'error',
  ],
  data: () => ({
    CaptchaVersionEnum,
    recaptchaWidgetId: undefined,
  }),
  computed: {
    enabled() {
      return Boolean(this.$store.state.site.settings?.['seo-integration:captcha:enabled']);
    },
    version() {
      return this.$store.state.site.settings?.['seo-integration:google-captcha-version'];
    },
    sitekey() {
      return this.$store.state.site.settings?.['seo-integration:use-google-captcha-key'];
    },
  },
  async mounted() {
    console.log('TheCaptcha');
    if (!this.enabled) {
      return;
    }
    await this.loadRecaptcha();
    await this.resetRepatcha();
  },
  methods: {
    async loadRecaptcha() {
      if (typeof grecaptcha !== 'undefined') {
        return;
      }
      const recaptchaScriptUrl = 'https://www.google.com/recaptcha/api.js' + ((this.version === CaptchaVersionEnum.RECAPTCHA_V3) ? ('?render=' + this.sitekey) : '');
      const recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute('type', 'text/javascript');
      recaptchaScript.setAttribute('src', recaptchaScriptUrl);
      document.head.appendChild(recaptchaScript);
      await new Promise(resolve => {
        recaptchaScript.addEventListener('load', event => {
          resolve();
        });
      });
    },
    async resetRepatcha() {
      if (typeof grecaptcha === 'undefined') {
        return;
      }
      console.log('grecaptcha ready before');
      grecaptcha.ready(() => {
        console.log('grecaptcha ready');
        if (this.version === CaptchaVersionEnum.RECAPTCHA_V2) {
          if (this.recaptchaWidgetId !== undefined) {
            grecaptcha.reset(this.recaptchaWidgetId);
          } else {
            console.log('grecaptcha render before');
            this.recaptchaWidgetId = grecaptcha.render(this.$refs.recaptchaContainer, {
              sitekey: this.sitekey,
              callback: token => {
                console.log('grecaptcha render callback');
                this.$emit('input', token);
              },
            });
          }
        } else if (this.version === CaptchaVersionEnum.RECAPTCHA_V3) {
          console.log('grecaptcha execute before');
          grecaptcha.execute(this.sitekey).then(token => {
            console.log('grecaptcha execute then');
            this.$emit('input', token);
          });
        }
      });
    },
  },
}
</script>
