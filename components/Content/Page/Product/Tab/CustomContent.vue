<template>
  <div class="no-fv">
    <h3 v-html="i18nParams.header || ''"></h3>
    <fragment v-html="i18nParams.description || ''"></fragment>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  props: ['commonParams', 'i18nParams'],
}
</script>
