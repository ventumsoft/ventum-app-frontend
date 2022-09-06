<template>
  <div class="no-fv">
    <h3 v-html="params.header || ''"></h3>
    <fragment v-html="params.description || ''"></fragment>
  </div>
</template>

<script>
export default {
  props: ['params'],
}
</script>
