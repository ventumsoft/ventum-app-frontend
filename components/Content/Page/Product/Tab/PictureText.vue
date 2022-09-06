<template>
  <div class="no-fv">
    <h3 class="nobottommargin" v-html="params.header || ''"></h3>
    <div class="row">
      <div class="col-md-6">
        <img
          :src="params.image || '/images/placeholder.jpg'"
          :alt="params.header || ''"
          class="center-block"
        >
      </div>
      <div class="col-md-6" v-html="params.description || ''"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['params'],
}
</script>
