<template>
  <style type="text/css" v-html="value"></style>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState('site', ['settings']),
    value() {
      const color = this.filterValidHexColor(this.settings?.['general:styles-main-color']) || '#59BA40';
      const secondaryColor = this.filterValidHexColor(this.settings?.['general:styles-second-color']) || '#ff9e36';
      const styles = this.settings?.['general:styles-css'] || '';
      return `
        :root {
          --custom-main-color: ${color};
          --custom-main-color-alpha12: ${color}12;
          --custom-secondary-color: ${secondaryColor};
        }
        ${styles}
      `;
    },
  },
  methods: {
    filterValidHexColor(color) {
      return color && /^#[a-f0-9]{6}$/i.test(color) && color;
    },
  },
}
</script>
