<template>
  <div class="no-fv">
    <h3 class="nobottommargin" v-html="i18nParams.header || ''"></h3>
    <div class="row">
      <div class="col-md-6">
        <img
          :src="('/attachment/' + i18nParams.attachment_hash) || '/images/placeholder.jpg'"
          :alt="i18nParams.header || ''"
          class="center-block"
        >
      </div>
      <div class="col-md-6" v-html="i18nParams.description || ''"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commonParams', 'i18nParams'],
}
</script>
